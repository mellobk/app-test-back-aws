"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _constants = require("../src/shared/constants.js");

var _database = require("./database/database.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* import "./models/Project.js";
import "./models/Task.js"; */
var startApp = function startApp() {
  try {
    _app["default"].listen(_constants.PORT);

    _database.sequelize.sync();
    
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

startApp();