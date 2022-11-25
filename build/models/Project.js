"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Projects = void 0;

var _sequelize = require("sequelize");

var _database = require("../database/database.js");

var _Task = require("./Task.js");

var Projects = _database.sequelize.define('projects', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.DataTypes.STRING
  },
  priority: {
    type: _sequelize.DataTypes.INTEGER
  },
  description: {
    type: _sequelize.DataTypes.STRING
  }
});

exports.Projects = Projects;
Projects.hasMany(_Task.Task, {
  foreignKey: 'projectId',
  sourceKey: 'id'
});

_Task.Task.belongsTo(Projects, {
  foreignKey: 'projectId',
  targetId: 'id'
});