'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.post('/user', UserController.saveUser);
api.get('/user', UserController.getUsers);
api.get('/user/:id', UserController.getUserById);
api.delete('/user/:id', UserController.deleteUser);

module.exports = api;