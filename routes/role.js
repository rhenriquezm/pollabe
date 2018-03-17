'use strict'

var express = require('express');
var RoleController = require('../controllers/role');

var api = express.Router();

api.post('/register', RoleController.saveRole);

module.exports = api;