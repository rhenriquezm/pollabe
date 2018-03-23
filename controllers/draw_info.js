'use strict'

var DrawInfo = require('../models/draw_info');
var moment = require('moment');

function getDrawInfos(req, res) {
    DrawInfo.find({}).exec((err, drawInfos) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!drawInfos) {
                res.status(404).send({
                    message: "No hay sorteos"
                });
            } else {
                res.status(200).send({
                    drawInfos: drawInfos
                });
            }

        }
    })
}

function getDrawInfoById(req, res) {
    DrawInfo.findById(req.params.id, (err, drawInfo) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!drawInfo) {
                res.status(404).send({
                    message: "No exite el sorteo"
                });
            } else {
                res.status(200).send({
                    drawInfo: drawInfo
                });
            }

        }
    })
}

function saveDrawInfo(req, res) {

    var drawInfo = new DrawInfo();
    var params = req.body;

    //fecha temporal
    
    params.drawInfo_date = moment();

    if (params.drawInfo_date && params.draw_id && params.season_id) {
        drawInfo.drawInfo_date = params.drawInfo_date;
        drawInfo.draw_id = params.draw_id;
        drawInfo.season_id = params.season_id;

        DrawInfo.findOne({ drawInfo_date: drawInfo.drawInfo_date }, (err, issetDrawInfo) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar la info del sorteo' });
            } else {
                if (!issetDrawInfo) {
                    drawInfo.save((err, drawInfoStored) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error al guardar la info del sorteo'
                            })
                        } else {
                            if (!drawInfoStored) {
                                res.status(404).send({
                                    message: 'No se ha registrado la info del sorteo'
                                })
                            } else {
                                res.status(200).send({
                                    drawInfo: drawInfoStored
                                })
                            }
                        }
                    })
                } else {
                    res.status(200).send({
                        message: 'La info del sorteo no puede registrarse por que ya existe'
                    })
                }
            }
        })
    } else {
        res.status(200).send({
            message: 'Introduce los datos correctamente'
        })
    }
}

function deleteDrawInfo(req, res) {
    DrawInfo.findByIdAndRemove(req.params.id, (err, drawInfoRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!drawInfoRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado la info del sorteo'
                });
            } else {
                res.status(200).send({
                    drawInfo: drawInfoRemoved
                });
            }
        }
    })
}

function updateDrawInfo(req, res) {
    var drawInfoId = req.params.id;
    var update = req.body;

    DrawInfo.findByIdAndUpdate(drawInfoId, update, (err, drawInfoUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!drawInfoUpdated) {
                res.status(404).send({
                    message: "No se ha encontrado la info del sorteo"
                });
            } else {
                res.status(200).send({
                    drawInfo: drawInfoUpdated
                });
            }
        }
    })
}

module.exports = {
    saveDrawInfo,
    getDrawInfos,
    getDrawInfoById,
    deleteDrawInfo,
    updateDrawInfo
};