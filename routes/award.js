'use strict'

var express = require('express');
var AwardController = require('../controllers/award');
var api = express.Router();

api.post('/awards', AwardController.saveAward);
api.get('/awards', AwardController.getAwards);
api.get('/awards/:id', AwardController.getAwardById);
api.delete('/awards/:id', AwardController.deleteAward);
api.put('/awards/:id', AwardController.updateAward);

module.exports = api;