'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var role_routes = require('./routes/role');
var user_routes = require('./routes/user');

// middlewares de body-parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors

// Rutas base

app.use('/api', role_routes, user_routes);

module.exports = app;