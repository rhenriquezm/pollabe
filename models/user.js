'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user_name: String,
    user_lastname: String,
    user_email: String,
    user_pass: String,
    role_id: { type: Schema.ObjectId, ref: 'Role' }
});

module.exports = mongoose.model('User', UserSchema);