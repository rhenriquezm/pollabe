'use strict'

var bcrypt = require('bcrypt-nodejs');
var Season = require('../models/season');

function getSeasons(req, res) {
    Season.find({}).exec((err, seasons) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!seasons) {
                res.status(404).send({
                    message: "No hay temporadas"
                });
            } else {
                res.status(200).send({
                    seasons: seasons
                });
            }
        }
    })
}

function getSeasonById(req, res) {
    var seasonId = req.params.id;

    Season.findById(seasonId, (err, season) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!season) {
                res.status(404).send({
                    message: "No exite la temporada"
                });
            } else {
                res.status(200).send({
                    season: season
                });
            }

        }
    })
}

function saveSeason(req, res) {
    var season = new Season();
    var params = req.body;

    if (params.season_number && params.season_description) {

        season.season_number = params.season_number;
        season.season_description = params.season_description;

        Season.findOne({ season_number: season.season_number }, (err, issetSeason) => {
            if (err) {
                res.status(500).send({
                    message: "Error al comprobar el usuario"
                });
            } else {
                if (!issetSeason) {
                    season.save((err, seasonStored) => {
                        if (err) {
                            res.status(500).send({
                                message: "Error al guardar la temporada"
                            });
                        } else {
                            if (!seasonStored) {
                                res.status(404).send({
                                    message: "No se ha podido guardar la temporada"
                                });
                            } else {
                                res.status(200).send({
                                    season: seasonStored
                                });
                            }
                        }
                    });

                } else {
                    res.status(500).send({
                        message: "La temporada ya existe"
                    });
                }
            }
        })
    } else {
        res.status(500).send({
            message: "Introduce los datos correctamente"
        });
    }
}

function updateSeason(req, res) {
    var seasonId = req.params.id;
    var update = req.body;

    Season.findByIdAndUpdate(seasonId, update, (err, seasonUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!seasonUpdated) {
                res.status(404).send({
                    message: "Temporada no encontrado"
                });
            } else {
                res.status(200).send({
                    season: seasonUpdated
                });
            }
        }
    })
}

function deleteSeason(req, res) {
    var userId = req.params.id;

    Season.findByIdAndRemove(userId, (err, userRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!userRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado el usuario'
                });
            } else {
                res.status(200).send({
                    user: userRemoved
                });
            }
        }
    })
}

module.exports = {
    saveSeason,
    getSeasons,
    getSeasonById,
    deleteSeason,
    updateSeason
};