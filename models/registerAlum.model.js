import { getData } from "../config/connection.config.js";
import { DataTypes } from 'sequelize';

const Alumnos = getData.sequelizeClient.define ('Alumnos', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    matricula: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    apellidoP: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    apellidoM: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    nombres: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
    sexo: {
        type : DataTypes.STRING,
        defaultValue: false,
    },
},{
    tableName: 'Alumnos',

})

export const getAlumnos = Alumnos; 