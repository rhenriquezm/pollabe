'use strict'

var express = require('express');
var DrawInfoController = require('../controllers/draw_info');
var api = express.Router();

api.post('/draw_infos', DrawInfoController.saveDrawInfo);
api.get('/draw_infos', DrawInfoController.getDrawInfos);
api.get('/draw_infos/:id', DrawInfoController.getDrawInfoById);
api.delete('/draw_infos/:id', DrawInfoController.deleteDrawInfo);
api.put('/draw_infos/:id', DrawInfoController.updateDrawInfo);

module.exports = api;