'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var role_routes = require('./routes/role');
var user_routes = require('./routes/user');
var award_routes = require('./routes/award');
var draw_route = require('./routes/draw');
var season_route = require('./routes/season');
var draw_info_route = require('./routes/draw_info');
var payment_route = require('./routes/payment');

// middlewares de body-parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors

// Rutas base

app.use('/api', role_routes, user_routes, award_routes, draw_route, season_route, draw_info_route, payment_route);

module.exports = app;