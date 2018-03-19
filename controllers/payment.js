'use strict'

var Payment = require('../models/payment');

function getPayments(req, res) {
    Payment.find({}).exec((err, payment) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!payment) {
                res.status(404).send({
                    message: "No hay pagos"
                });
            } else {
                res.status(200).send({
                    payment: payment
                });
            }

        }
    })
}

function getPaymentById(req, res) {
    Payment.findById(req.params.id, (err, payment) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!payment) {
                res.status(404).send({
                    message: "No exite pago"
                });
            } else {
                res.status(200).send({
                    payment: payment
                });
            }

        }
    })
}

function savePayment(req, res) {
    var payment = new Payment();
    var params = req.body;

    if (params.payment_amount && params.user_id && params.draw_date_id && params.payment_state) {
        payment.payment_amount = params.payment_amount;
        payment.payment_state = params.payment_state;
        payment.user_id = params.user_id;
        payment.draw_date_id = params.draw_date_id;

        // Definir cuando no se puede guardar un pago

        payment.save((err, paymentStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar el pago'
                })
            } else {
                if (!paymentStored) {
                    res.status(404).send({
                        message: 'No se ha registrado el pago'
                    })
                } else {
                    res.status(200).send({
                        payment: paymentStored
                    })
                }
            }
        })
    } else {
        res.status(200).send({
            message: 'Introduce los datos correctamente'
        })
    }
}

function deletePayment(req, res) {
    Payment.findByIdAndRemove(req.params.id, (err, paymentRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!paymentRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado el pago'
                });
            } else {
                res.status(200).send({
                    payment: paymentRemoved
                });
            }
        }
    })
}

function updatePayment(req, res) {
    var paymentId = req.params.id;
    var update = req.body;

    Payment.findByIdAndUpdate(paymentId, update, (err, paymentUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!paymentUpdated) {
                res.status(404).send({
                    message: "No se ha encontrado el pago"
                });
            } else {
                res.status(200).send({
                    payment: paymentUpdated
                });
            }
        }
    })
}

module.exports = {
    savePayment,
    getPayments,
    getPaymentById,
    deletePayment,
    updatePayment
};