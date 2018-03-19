'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrawInfoSchema = Schema({
    drawInfo_date: Date,
    draw_id: { type: Schema.Types.ObjectId, ref: 'Draw' },
    season_id: { type: Schema.Types.ObjectId, ref: 'Season' }
});

module.exports = mongoose.model('DrawInfo', DrawInfoSchema);