import { getData } from "../config/connection.config.js";
import { DataTypes } from 'sequelize';
import bcrypt from "bcrypt";


const users = getData.sequelizeClient.define('users', {

    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    usuario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
   tableName: 'users',
   freezeTableName: true,
   hooks: {
    beforeCreate: (user, options) => {
        user.Password = user.Password && user.Password != "" ? bcrypt.hashSync(user.Password, 10): "";    
    }
   }
});

export const getusers = users;