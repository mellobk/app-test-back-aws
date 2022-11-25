import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Rol } from "./Rol.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },

});

// user relations

User.belongsTo(Rol,{
  foreignKey: 'rol_id',
  sourceKey: 'id'
})

Rol.hasMany(User,{
  foreignKey: 'rol_id',
  targetId: 'id'
})

