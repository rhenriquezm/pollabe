'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrawSchema = Schema({
    award_id: { type: Schema.Types.ObjectId, ref: 'Award' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Draw', DrawSchema);