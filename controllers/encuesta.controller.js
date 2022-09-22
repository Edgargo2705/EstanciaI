import bodyParser from "body-parser";
import { Router } from "express";
import { getPreguntas } from "../models/encuesta.model.js";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const preguntas_view = async (req,res) => {
  getPreguntas.findAll({
    attributes:["id",'pregunta_1','pregunta_2','pregunta_3','pregunta_4']})
.then(preguntas => {
    res.send(preguntas)
})
.catch(err => {
    console.log(err)
})
}

const preguntas_create = async (req,res) => {
    const pregunta_1 = req.body.pregunta_1;
    const pregunta_2 = req.body.pregunta_2;
    const pregunta_3 = req.body.pregunta_3
    const pregunta_4 = req.body.pregunta_4;

    getPreguntas.create({
        pregunta_1,
        pregunta_2,
        pregunta_3,
        pregunta_4
    },
    {
        fields: ['pregunta_1','pregunta_2','pregunta_3','pregunta_4']
    })
    .then((preguntas) => {
        res.send(preguntas);
      })
      .catch((err) => {
        console.log(err);
      });

}

const preguntas_delete = async (req,res) => {
  const id = req.body.id;
  getPreguntas.destroy({where: {id:id}})
  .then((r) => {
      res.status(200).json({ message: "Deleted successfully" });
  })
  .catch((err) => {
      res.status(400).send(err);
  });
}

const preguntas_update = async (req,res) => {
  const id = req.body.id;
  const pregunta_1 = req.body.pregunta_1;
  const pregunta_2 = req.body.pregunta_2;
  const pregunta_3 = req.body.pregunta_3
  const pregunta_4 = req.body.pregunta_4;

  getPreguntas.findOne({ where: {id:id}})
  .then((preguntas) => {
    preguntas.update({pregunta_1:pregunta_1, pregunta_2:pregunta_2, pregunta_3:pregunta_3, pregunta_4:pregunta_4})
      res.status(200).json({ successfully: 'Datos Actualizados' });
  })
  .catch((err) => {
      err.status(400).json({ err: 'Error al actualizar' });
  })
}

export const encuestaController = { preguntas_create,preguntas_delete,preguntas_update,preguntas_view};