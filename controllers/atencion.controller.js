
import { Router } from "express";
import { dataEnv } from "../config/env.config.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { getAtencion_estudiantes } from "../models/atencion.model.js";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const AtencionData_view = async (req,res) =>{
  getAtencion_estudiantes
    .findAll({
      attributes: [
        "id",
        "numTR",
        "numTRiesgo",
        "numTCO",
        "numBajaD",
        "EBTemporal",
      ],
    })
    .then((atencion) => {
      res.send(atencion);
    })
    .catch((err) => {
      console.log(err);
    });
}

const AtencionData_create = async (req, res) => {
  const numTR = req.body.numTR;
  const numTRiesgo = req.body.numTRiesgo;
  const numTCO = req.body.numTCO;
  const numBajaD = req.body.numBajaD;
  const EBTemporal = req.body.EBTemporal;

  getAtencion_estudiantes
    .create(
      {
        numTR,
        numTRiesgo,
        numTCO,
        numBajaD,
        EBTemporal,
      },
      {
        fields: [
          "numTR",
          "numTRiesgo",
          "numTCO",
          "numBajaD",
          "EBTemporal",
        ],
      }
    )

    .then((atencion) => {
      res.send(atencion);
    })
    .catch((err) => {
      console.log(err);
    });
};

const AtencionData_delete = async (req,res) => {
  const id = req.body.id;
  getAtencion_estudiantes.destroy({where: {id:id}})
  .then((r) => {
      res.status(200).json({ message: "Deleted successfully" });
  })
  .catch((err) => {
      res.status(400).send(err);
  });
}

const AtencionData_update = async (req,res) => {
  const id = req.body.id;
  const numTR = req.body.numTR;
  const numTRiesgo = req.body.numTRiesgo;
  const numTCO = req.body.numTCO;
  const numBajaD = req.body.numBajaD;
  const EBTemporal = req.body.EBTemporal;


  getAtencion_estudiantes.findOne({ where: {id:id}})
  .then((atencion) => {
    atencion.update({numTR:numTR, numTRiesgo:numTRiesgo, 
      numTCO:numTCO, numBajaD:numBajaD,EBTemporal:EBTemporal})
      res.status(200).json({ successfully: 'Datos Actualizados' });
  })
  .catch((err) => {
      err.status(400).json({ err: 'Error al actualizar' });
  })
}


export const atencionController = { AtencionData_create, AtencionData_update, AtencionData_delete,AtencionData_view};
