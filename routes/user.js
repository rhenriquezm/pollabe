'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();

api.post('/users', UserController.saveUser);
api.get('/users', UserController.getUsers);
api.get('/users/:id', UserController.getUserById);
api.delete('/users/:id', UserController.deleteUser);
api.put('/users/:id', UserController.updateUser);

module.exports = api;