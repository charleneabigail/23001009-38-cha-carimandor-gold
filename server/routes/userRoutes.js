const express = require('express');
const UserController = require('../controllers/UserController');
const routes = express.Router()

// route level middleware
const printTime = (req, res, next) => {
    let nowDate = new Date()
    console.log(`Current time is ${nowDate}`);
    next()
}

routes.use(printTime)

routes.post('/register', UserController.register)

routes.get('/login', UserController.showLoginPage)

routes.post('/login', UserController.login)

routes.get('/show-user', UserController.showListUser);


module.exports = routes
