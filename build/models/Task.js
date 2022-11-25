"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var _sequelize = require("sequelize");

var _database = require("../database/database.js");

var Task = _database.sequelize.define('task', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.DataTypes.STRING
  },
  done: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  }
});

exports.Task = Task;