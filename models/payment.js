'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = Schema({
    payment_amount: Number,
    payment_state: Boolean,
    draw_date_id: { type: Schema.Types.ObjectId, ref: 'DrawInfo' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Payment', PaymentSchema);