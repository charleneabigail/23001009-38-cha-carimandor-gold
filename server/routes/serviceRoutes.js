const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const UserController = require('../controllers/UserController');
const ServicePageController = require('../controllers/ServicePageController');
const routes = express.Router();

routes.get('/list-services', ServiceController.showListServices)

routes.post('/', ServiceController.addService)

routes.put('/update-service/:id', ServiceController.updateService)

routes.delete('/delete-service/:id', ServiceController.deleteService)


module.exports = routes