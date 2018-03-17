'use strict'

var express = require('express');
var RoleController = require('../controllers/role');

var api = express.Router();

api.post('/role', RoleController.saveRole);

module.exports = api;