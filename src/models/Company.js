import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import { User } from './User.js';

export const Company = sequelize.define('company',    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nit:{
        type: DataTypes.STRING,
    },
    name :{
        type: DataTypes.STRING,
    },
    address :{
        type: DataTypes.STRING,
    },
    phone :{
        type: DataTypes.STRING,
    },
});

User.hasMany(Company,{
    foreignKey: 'user_id',
    sourceKey: 'id'
  })
  
  Company.belongsTo(User,{
    foreignKey: 'user_id',
    targetId: 'id'
  })
  
