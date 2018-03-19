'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeasonSchema = Schema({
    season_number: Number,
    season_description: String
});

module.exports = mongoose.model('Season', SeasonSchema);