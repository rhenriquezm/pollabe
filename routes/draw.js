'use strict'

var express = require('express');
var DrawController = require('../controllers/draw');
var api = express.Router();

api.post('/draws', DrawController.saveDraw);
api.get('/draws', DrawController.getDraws);
api.get('/draws/:id', DrawController.getDrawById);
api.delete('/draws/:id', DrawController.deleteDraw);
api.put('/draws/:id', DrawController.updateDraw);

module.exports = api;