'use strict'

var Draw = require('../models/draw');

function getDraws(req, res) {
    Draw.find({}).exec((err, draw) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!draw) {
                res.status(404).send({
                    message: "No hay Sorteo"
                });
            } else {
                res.status(200).send({
                    draw: draw
                });
            }

        }
    })
}

function getDrawById(req, res) {
    Draw.findById(req.params.id, (err, draw) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!draw) {
                res.status(404).send({
                    message: "No exite el sorteo"
                });
            } else {
                res.status(200).send({
                    draw: draw
                });
            }

        }
    })
}

function saveDraw(req, res) {
    var draw = new Draw();
    var params = req.body;

    if (params.award_id && params.user_id) {
        draw.award_id = params.award_id;
        draw.user_id = params.user_id;
        //No se puede repetir un usuario, es decir, no pueden haber dos ganadores 
        Draw.findOne({ user_id: draw.user_id }, (err, issetDraw) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el sorteo' });
            } else {
                if (!issetDraw) {
                    draw.save((err, drawStored) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error al guardar el sorteo'
                            })
                        } else {
                            if (!drawStored) {
                                res.status(404).send({
                                    message: 'No se ha registrado el sorteo'
                                })
                            } else {
                                res.status(200).send({
                                    draw: drawStored
                                })
                            }
                        }
                    })
                } else {
                    res.status(200).send({
                        message: 'El sorteo no puede registrarse por que ya existe un ganador dentro de esta temporada'
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

function deleteDraw(req, res) {
    Draw.findByIdAndRemove(req.params.id, (err, drawRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!drawRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado el sorteo'
                });
            } else {
                res.status(200).send({
                    draw: drawRemoved
                });
            }
        }
    })
}

function updateDraw(req, res) {
    var drawId = req.params.id;
    var update = req.body;

    Draw.findByIdAndUpdate(drawId, update, (err, drawUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!drawUpdated) {
                res.status(404).send({
                    message: "No se ha encontrado el sorteo"
                });
            } else {
                res.status(200).send({
                    draw: drawUpdated
                });
            }
        }
    })
}

module.exports = {
    saveDraw,
    getDraws,
    getDrawById,
    deleteDraw,
    updateDraw
};