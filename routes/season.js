'use strict'

var express = require('express');
var SeasonController = require('../controllers/season');
var api = express.Router();

api.post('/seasons', SeasonController.saveSeason);
api.get('/seasons', SeasonController.getSeasons);
api.get('/seasons/:id', SeasonController.getSeasonById);
api.delete('/seasons/:id', SeasonController.deleteSeason);
api.put('/seasons/:id', SeasonController.updateSeason);

module.exports = api;