import { Router } from 'express';
import bodyParser from "body-parser";
import { getAlumnos } from '../models/registerAlum.model.js';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const estudiantes_create = async (req,res) => {
    const matricula = req.body.matricula;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    const nombres = req.body.nombres;
    const sexo = req.body.sexo;

    getAlumnos.create({
        matricula,
        apellidoP,
        apellidoM,
        nombres,
        sexo
    },{
        fields: ['matricula','apellidoP','apellidoM','nombres','sexo']
    })
    
    .then(estudiantes => {
        res.send(estudiantes)
    })
    .catch((err) => {
        console.log(err)
    })

};


const estudiantes_view = async (req,res) => {
    getAlumnos.findAll({
        attributes :['id','matricula','apellidoP','apellidoM','nombres','sexo']
    })

    .then(estudiantes => {
        res.send(estudiantes)
    })
    .catch((err) => {
        console.log(err)
    })
};

const estudiantes_update = async (req,res) => {
    const id = req.body.id;
    const matricula = req.body.matricula;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    const nombres = req.body.nombres;
    const sexo = req.body.sexo;

    getAlumnos.findOne({where: {id:id}})
    .then((alumnos) => {
        alumnos.update({matricula:matricula, apellidoP:apellidoP, apellidoM:apellidoM,
            nombres:nombres, sexo:sexo})
            res.status(200).json({ successfully: 'Datos Actualizados' });
    })
    .catch((err)=>{
        err.status(400).json({ err: 'Error al actualizar' });
    })
};

const estudiantes_delete = async (req,res) => {
    const id = req.body.id;
    getAlumnos.destroy({where: {id:id}})
    .then((alumnos) => {
    res.status(200).json({ message: "Deleted successfully" });
})
    .catch((err) => {
    res.status(400).send(err);
});
}

export const alumnosController = {estudiantes_create,estudiantes_view,estudiantes_update,estudiantes_delete}