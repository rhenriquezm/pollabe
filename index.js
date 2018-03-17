'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

var urlMLab = 'mongodb://rhenriquez:18denoviembredel@ds137336.mlab.com:37336/testmongo';
var urlLocal = 'mongodb://localhost:27017/Polla';

mongoose.connect(urlLocal)
    .then(() => {
        console.log("La conexion a la base de datos ha sido realizada exitosamente...");
        app.listen(port, () => {
            console.log("El servidor local con Node y Express está corriendo correctamente...");
        });
    }).catch(err =>
        console.log(err)
    );