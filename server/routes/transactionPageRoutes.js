const express = require('express')
const TransactionPageController = require ('../controllers/TransactionPageController')
const routes = express.Router()

routes.post('/add-transaction-result/:id_service', TransactionPageController.addTransaction)

routes.get('/add-transaction-form/:id', TransactionPageController.addTransactionForm)

module.exports = routes