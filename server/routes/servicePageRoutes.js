const express = require ('express')
const ServicePageController = require('../controllers/ServicePageController')
const routes = express.Router()

routes.get('/list-services', ServicePageController.showListServices)

routes.get('/add-service', ServicePageController.showAddServicePage)

routes.post('/add-service-result', ServicePageController.addServicePage)

routes.get('/update-service/:id', ServicePageController.showUpdateServicePage)

routes.post('/update-service-result/:id', ServicePageController.updateServicePage) // di browser gak bisa pake put/patch

routes.get('/delete-service-result/:id', ServicePageController.deleteServicePage) // di browser gak bisa pake delete



module.exports = routes;