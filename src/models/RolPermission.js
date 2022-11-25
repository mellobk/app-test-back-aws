import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Permission } from "./Permission.js";
import { Rol } from "./Rol.js";

export const RolPermission = sequelize.define("RolPermission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

//

Rol.hasMany(RolPermission, {
  foreignKey: "rol_id",
  sourceKey: "id",
});

RolPermission.belongsTo(Rol, {
  foreignKey: "rol_id",
  targetId: "id",
});

Permission.hasMany(RolPermission, {
  foreignKey: "permission_id",
  sourceKey: "id",
});

RolPermission.belongsTo(Permission, {
  foreignKey: "permission_id",
  targetId: "id",
});
