'use strict'

var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');

// servicio jwt

var jwt = require('../services/jwt');

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
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
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

    var params = req.body;

    if (params.user_pass && params.user_name && params.user_lastname && params.user_email && params.role_id) {

        user.user_name = params.user_name;
        user.user_lastname = params.user_lastname;
        user.user_email = params.user_email.toLowerCase();
        user.user_pass = params.user_pass;
        user.role_id = params.role_id;

        User.findOne({ user_email: user.user_email }, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: "Error al comprobar el usuario"
                });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.user_pass, null, null, function (err, hash) {
                        user.user_pass = hash;

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

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: "Usuario no encontrado"
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    })
}

function deleteUser(req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userRemoved) => {
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

function login(req, res) {

    var params = req.body;
    var email = params.user_email;
    var pass = params.user_pass;

    User.findOne({ user_email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: "Error al comprobar el usuario"
            });
        } else {
            if (user) {
                bcrypt.compare(pass, user.user_pass, (err, check) => {
                    if (check) {
                        //comprobar y generar el token
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user: user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: "El usuario no ha podido loguearse correctamente"
                        });
                    }
                })
            } else {
                res.status(404).send({
                    message: "El usuario no ha podido loguearse"
                });
            }
        }
    })

    //res.status(200).send({
    //    message: 'Metodo del login'
    //});
}

module.exports = {
    saveUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    login
};