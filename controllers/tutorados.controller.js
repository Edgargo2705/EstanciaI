import { Router } from 'express';
import { dataEnv } from '../config/env.config.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { getTutorados } from '../models/tutorados.model.js';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const TutoradosData_view = async (req,res) => {
    getTutorados.findAll({
        attributes:["id",'periodoEscolar','cuatrimestre','grupo',
        'hombresTA','mujeresTA','hombresAtendidos',
        'mujeresAtendidos','resuelto','canalizacion',
        'casosTutor','casosCanaliacion']})
    .then(tutorados => {
        res.send(tutorados)
    })
    .catch(err => {
        console.log(err)
    })
}


const TutoradosData_create = async (req, res) => {
    const periodoEscolar = req.body.periodoEscolar;
    const cuatrimestre = req.body.cuatrimestre;
    const grupo = req.body.grupo;
    const hombresTA = req.body.hombresTA;
    const mujeresTA = req.body.mujeresTA;
    const hombresAtendidos = req.body.hombresAtendidos;
    const mujeresAtendidos = req.body.mujeresAtendidos;
    const resuelto = req.body.resuelto;
    const canalizacion = req.body.canalizacion;
    const casosTutor = req.body.casosTutor;
    const casosCanaliacion = req.body.casosCanaliacion;

    getTutorados.create({
        periodoEscolar,
        cuatrimestre,
        grupo,
        hombresTA,
        mujeresTA,
        hombresAtendidos,
        mujeresAtendidos,
        resuelto,
        canalizacion,
        casosTutor,
        casosCanaliacion
    },
    {fields: ['periodoEscolar','cuatrimestre','grupo',
    'hombresTA','mujeresTA','hombresAtendidos',
    'mujeresAtendidos','resuelto','canalizacion',
    'casosTutor','casosCanaliacion']})
    
    .then(tutorados => {
        res.send(tutorados);
    })
    .catch((err)=> {
        console.log(err);
    })
    
};

const TutoradosData_delete = async (req,res) => {
    const id = req.body.id;
    getTutorados.destroy({where: {id:id}})
    .then((r) => {
        res.status(200).json({ message: "Deleted successfully" });
    })
    .catch((err) => {
        res.status(400).send(err);
    });
}

const TutoradosData_update = async (req,res) => {
    const id = req.body.id;
    const periodoEscolar = req.body.periodoEscolar;
    const cuatrimestre = req.body.cuatrimestre;
    const grupo = req.body.grupo;
    const hombresTA = req.body.hombresTA;
    const mujeresTA = req.body.mujeresTA;
    const hombresAtendidos = req.body.hombresAtendidos;
    const mujeresAtendidos = req.body.mujeresAtendidos;
    const resuelto = req.body.resuelto;
    const canalizacion = req.body.canalizacion;
    const casosTutor = req.body.casosTutor;
    const casosCanaliacion = req.body.casosCanaliacion;

    getTutorados.findOne({ where: {id:id}})
    .then((tutorados) => {
        tutorados.update({periodoEscolar:periodoEscolar, cuatrimestre:cuatrimestre, grupo:grupo,
            hombresTA:hombresTA,mujeresTA:mujeresTA,hombresAtendidos:hombresAtendidos,
            mujeresAtendidos:mujeresAtendidos,resuelto:resuelto,canalizacion:canalizacion,
            casosTutor:casosTutor,casosCanaliacion:casosCanaliacion})
        res.status(200).json({ successfully: 'Datos Actualizados' });
    })
    .catch((err) => {
        err.status(400).json({ err: 'Error al actualizar' });
    })
}


export const tutoradosController = {TutoradosData_create,TutoradosData_delete,TutoradosData_update,TutoradosData_view}