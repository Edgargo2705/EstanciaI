import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";

const preguntas = getData.sequelizeClient.define(
  "Preguntas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pregunta_1: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    pregunta_2: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    pregunta_3: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    pregunta_4: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    tableName: "Preguntas",
  }
);

export const getPreguntas = preguntas;
