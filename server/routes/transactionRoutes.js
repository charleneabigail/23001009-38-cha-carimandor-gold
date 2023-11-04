const express = require('express');
const TransactionController = require('../controllers/TransactionController');
const routes = express.Router()

routes.get('/show-transaction/:id', TransactionController.showTransaction)

routes.post('/add-transaction', TransactionController.addTransaction)

routes.patch('/status-payment-success', TransactionController.updateStatusPaymentSucces)

routes.patch('/status-payment-failed', TransactionController.updateStatusPaymentFailed)

routes.patch('/canceled-by-customer', TransactionController.cancelTransactionByCustomer)

routes.patch('/canceled-by-seller', TransactionController.cancelTransactionBySeller)

module.exports = routes