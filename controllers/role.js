'use strict'

//Modulos

//models

var Role = require('../models/role');

//actions

function getRoles(req, res) {
    Role.find({}).exec((err, roles) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!roles) {
                res.status(404).send({
                    message: "No hay roles"
                });
            } else {
                res.status(200).send({
                    roles: roles
                });
            }

        }
    })
}

function getRoleById(req, res) {
    Role.findOne({ _id: req.params.id }).exec((err, rol) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!rol) {
                res.status(404).send({
                    message: "No exite el rol"
                });
            } else {
                res.status(200).send({
                    rol: rol
                });
            }

        }
    })
}

function saveRole(req, res) {
    // Crear objeto Role
    var role = new Role();

    // Recoger el body de la peticion
    var params = req.body;

    //Asignar valores al objeto usuario
    if (params.role_name && params.role_description) {
        role.role_name = params.role_name;
        role.role_description = params.role_description;

        Role.findOne({ role_name: role.role_name.toLowerCase() }, (err, issetRole) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el rol' });
            } else {
                if (!issetRole) {
                    role.save((err, roleStored) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error al guardar el rol'
                            })
                        } else {
                            if (!roleStored) {
                                res.status(404).send({
                                    message: 'No se ha registrado el rol'
                                })
                            } else {
                                res.status(200).send({
                                    role: roleStored
                                })
                            }
                        }
                    })
                } else {
                    res.status(200).send({
                        message: 'El rol no puede registrarse por que ya existe'
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

function deleteRole(req, res) {
    Role.findByIdAndRemove(req.params.id, (err, roleRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!roleRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado el usuario'
                });
            } else {
                res.status(200).send({
                    role: roleRemoved
                });
            }
        }
    })
}


module.exports = {
    saveRole,
    getRoles,
    getRoleById,
    deleteRole
};