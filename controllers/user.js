'use strict'

var bcrypt = require('bcrypt-nodejs');

//Modulos

//models

var User = require('../models/user');

//actions

function getUsers(req, res) {
    User.find({}).exec((err, users) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!users) {
                res.status(404).send({
                    message: "No hay usuarios"
                });
            } else {
                res.status(200).send({
                    users: users
                });
            }

        }
    })
}

function getUserById(req, res) {
    User.findOne({ _id: req.params.id }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: "No exite el usuario"
                });
            } else {
                res.status(200).send({
                    user: user
                });
            }

        }
    })
}

function saveUser(req, res) {

    var user = new User();

    // Recoger el body de la peticion
    var params = req.body;

    if (params.user_pass && params.user_name && params.user_lastname && params.user_email && params.role_id) {

        user.user_name = params.user_name;
        user.user_lastname = params.user_lastname;
        user.user_email = params.user_email;
        user.user_pass = params.user_pass;
        user.role_id = params.role_id;

        User.findOne({ user_email: user.user_email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: "Error al comprobar el usuario"
                });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.user_pass, null, null, function (err, hash) {
                        params.user_pass = hash;
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({
                                        message: "No se ha podido guardar el usuario"
                                    });
                                } else {
                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }
                        });
                    })
                } else {
                    res.status(500).send({
                        message: "El usuario ya existe"
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

function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id, (err, userRemoved) => {
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
//actions

module.exports = {
    saveUser,
    getUsers,
    getUserById,
    deleteUser
};