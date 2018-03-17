'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.post('/registeruser', UserController.saveUser);

module.exports = api;