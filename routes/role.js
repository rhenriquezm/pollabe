'use strict'

var express = require('express');
var RoleController = require('../controllers/role');

var api = express.Router();

api.post('/roles', RoleController.saveRole);
api.get('/roles', RoleController.getRoles);
api.get('/roles/:id', RoleController.getRoleById);
api.delete('/roles/:id', RoleController.deleteRole);

module.exports = api;