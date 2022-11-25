import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import { Company } from './Company.js';

export const Inventory = sequelize.define('inventory',    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    article :{
        type: DataTypes.STRING,
    },
    quantity :{
        type: DataTypes.INTEGER,
    },
});


Company.hasMany(Inventory,{
    foreignKey: 'company_id',
    sourceKey: 'id'
  })
  
  Inventory.belongsTo(Company,{
    foreignKey: 'company_id',
    targetId: 'id'
  })
  