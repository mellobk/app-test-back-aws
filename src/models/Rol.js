import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Rol = sequelize.define('rol',    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type: DataTypes.STRING,
    },
});

