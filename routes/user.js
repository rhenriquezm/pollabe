'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/users', md_auth.ensureAuth, UserController.saveUser);
api.get('/users', md_auth.ensureAuth, UserController.getUsers);
api.get('/users/:id', UserController.getUserById);
api.delete('/users/:id', UserController.deleteUser);
api.put('/users/:id', UserController.updateUser);
api.post('/users/login', UserController.login);

module.exports = api;