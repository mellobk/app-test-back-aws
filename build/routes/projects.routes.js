"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _projectsController = require("../controller/projects.controller.js");

var router = (0, _express.Router)();
router.get('/projects', _projectsController.getProjects);
router.post('/projects', _projectsController.createProject);
router.put('/projects/:id', _projectsController.updateProject);
router["delete"]('/projects/:id');
router.get('/projects/:id');
var _default = router;
exports["default"] = _default;