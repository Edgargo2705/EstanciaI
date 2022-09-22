import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";

const atencion_estudiantes = getData.sequelizeClient.define(
  "Atencion_estudiantes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    numTR: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    numTRiesgo: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    numTCO: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    numBajaD: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    EBTemporal: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    tableName: "Atencion_estudiantes",
  }
);

export const getAtencion_estudiantes = atencion_estudiantes;
