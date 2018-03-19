'use strict'

var express = require('express');
var PaymentController = require('../controllers/payment');
var api = express.Router();

api.post('/payments', PaymentController.savePayment);
api.get('/payments', PaymentController.getPayments);
api.get('/payments/:id', PaymentController.getPaymentById);
api.delete('/payments/:id', PaymentController.deletePayment);
api.put('/payments/:id', PaymentController.updatePayment);

module.exports = api;