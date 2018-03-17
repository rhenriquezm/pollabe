'use strict'

var bcrypt = require('bcrypt-nodejs');

//Modulos

//models

var User = require('../models/user');

//actions

function saveUser(req, res) {

    var user = new User();

    // Recoger el body de la peticion
    var params = req.body;

    if (params.user_name, params.user_lastname, params.user_email, params.user_pass, params.role_id) {

        user.user_name = params.user_name;
        user.user_lastname = params.user_lastname;
        user.user_email = params.user_email;
        user.user_pass = params.user_pass;
        user.role_id = params.role_id;

        console.log(user);

        user.save((err, userStored) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send({
                    user: userStored
                })
            }
        })

        /*User.findOne({ user_email: user.user_email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al comprobar el usuario'
                })
            } else {
                console.log(issetUSer);
                if (!issetUser) {
                    bcrypt.hash(params.user_pass, null, null, function (err, hash) {
                        user.user_pass = hash;

                        user.save((err, userStored => {
                            if (err) {
                                res.status(500).send({
                                    message: 'Error al guardar el usuario'
                                })
                            } else {
                                if (!userStored) {
                                    res.status(404).send({ message: 'No se ha registrado el usuario' })
                                } else {
                                    res.status(200).send({ user: userStored })
                                }
                            }
                        }))
                    })
                } else {
                    res.status(200).send({
                        message: 'El usuario no puede registrarse por que ya existe'
                    })
                }
            }
        })*/
    } else {
        res.status(200).send({
            message: 'Introduce los datos correctamente'
        })
    }
}
//actions

module.exports = {
    saveUser
};