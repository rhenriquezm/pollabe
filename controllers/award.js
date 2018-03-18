'use strict'

var Award = require('../models/award');

function getAwards(req, res) {
    Award.find({}).exec((err, award) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!award) {
                res.status(404).send({
                    message: "No hay Premios"
                });
            } else {
                res.status(200).send({
                    award: award
                });
            }

        }
    })
}

function getAwardById(req, res) {
    Award.findById(req.params.id, (err, award) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!award) {
                res.status(404).send({
                    message: "No exite el premio"
                });
            } else {
                res.status(200).send({
                    award: award
                });
            }

        }
    })
}

function saveAward(req, res) {

    var award = new Award();
    var params = req.body;

    if (params.award_amount && params.award_description) {
        award.award_amount = params.award_amount;
        award.award_description = params.award_description;

        Award.findOne({ award_amount: award.award_amount }, (err, issetAward) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el premio' });
            } else {
                if (!issetAward) {
                    award.save((err, awardStored) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error al guardar el premio'
                            })
                        } else {
                            if (!awardStored) {
                                res.status(404).send({
                                    message: 'No se ha registrado el premio'
                                })
                            } else {
                                res.status(200).send({
                                    award: awardStored
                                })
                            }
                        }
                    })
                } else {
                    res.status(200).send({
                        message: 'El premio no puede registrarse por que ya existe'
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

function deleteAward(req, res) {
    Award.findByIdAndRemove(req.params.id, (err, awardRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!awardRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado el premio'
                });
            } else {
                res.status(200).send({
                    award: awardRemoved
                });
            }
        }
    })
}

function updateAward(req, res) {
    var awardId = req.params.id;
    var update = req.body;

    Award.findByIdAndUpdate(awardId, update, (err, awardUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!awardUpdated) {
                res.status(404).send({
                    message: "No se ha encontrado el premio"
                });
            } else {
                res.status(200).send({
                    award: awardUpdated
                });
            }
        }
    })
}

module.exports = {
    saveAward,
    getAwards,
    getAwardById,
    deleteAward,
    updateAward
};