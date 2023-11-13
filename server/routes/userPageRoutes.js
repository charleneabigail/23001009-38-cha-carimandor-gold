const express = require('express');
const UserPageController = require('../controllers/UserPageController');
const routes = express.Router();

routes.get('/landing-page', UserPageController.showLandingPage)

routes.get('/list-user-page', UserPageController.showListUserPage)

routes.get('/register-page', UserPageController.showRegisterPage)

routes.post('/register-page-result', UserPageController.register)

routes.get('/login-page', UserPageController.showLoginPage)

routes.post('/login-page-result', UserPageController.login)

routes.get('/edit-user/:id', UserPageController.showEditUserPage)

routes.post('/edit-user-result/:id', UserPageController.editUserPage)

routes.get('/delete-user-result/:id', UserPageController.deleteUserPage)

module.exports = routes