'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

require('dotenv').config();

var urlMLab = process.env.URL_MLAB;
var urlLocal = process.env.URL_LOCAL;

mongoose.connect(urlLocal)
    .then(() => {
        console.log("La conexion a la base de datos ha sido realizada exitosamente...");
        app.listen(port, () => {
            console.log("El servidor local con Node y Express está corriendo correctamente...");
        });
    }).catch(err =>
        console.log(err)
    );