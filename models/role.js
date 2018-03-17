'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = Schema({
    role_name: String,
    role_description: String
});


module.exports = mongoose.model('Role', RoleSchema);