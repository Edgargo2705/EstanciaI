import { getData } from "../config/connection.config.js";
import { DataTypes } from 'sequelize';

const tutorados = getData.sequelizeClient.define ('tutorias', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    periodoEscolar: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    cuatrimestre: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    grupo: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    hombresTA: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    mujeresTA: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    hombresAtendidos: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    mujeresAtendidos: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    resuelto: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    canalizacion : {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    casosTutor: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    casosCanaliacion: {
        type : DataTypes.STRING,
        defaultValue: false,
    },

},{
    tableName: 'tutorias',

})

export const getTutorados = tutorados; 