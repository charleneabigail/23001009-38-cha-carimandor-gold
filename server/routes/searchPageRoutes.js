const express = require ('express')
const SearchPageController = require('../controllers/SearchPageController')
const routes = express.Router()

routes.get('/search-list-services', SearchPageController.showSearchPage)


module.exports = routes;