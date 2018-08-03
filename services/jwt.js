'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

//var secret = process.env.SECRET_KEY_JWT;

//console.log(process.env.SECRET_KEY_JWT);
//var secret = "estaesmiclavesecretapaljwt";

exports.createToken = function (user) {

    var secret = process.env.SECRET_KEY_JWT;

    var payload = {
        sub: user._id,
        name: user.user_name,
        lastname: user.user_lastname,
        user_email: user.user_email,
        role: user.role_id,

        iat: moment().unix(), //timestamp actual
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
};