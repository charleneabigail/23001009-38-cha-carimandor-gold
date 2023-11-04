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

routes.get('/register-page', UserController.showRegisterPage)

routes.post('/register', UserController.register)

routes.get('/login-page', UserController.showLoginPage)

routes.post('/login', UserController.login)

routes.get('/show-user', UserController.showListUser);

routes.put('/edit-user/:id', UserController.editUser)

// routes.delete('/delete-all-user', UserController.deleteAllUser)

routes.delete('/deleteuserbyid/:id', UserController.deleteUserById)


module.exports = routes
