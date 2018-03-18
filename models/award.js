'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardSchema = Schema({
    award_amount: Number,
    award_description: String
});

module.exports = mongoose.model('Award', AwardSchema);