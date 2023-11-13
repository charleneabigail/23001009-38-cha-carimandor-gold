const express = require('express');
const WishlistPageController = require('../controllers/WishlistPageController');
const routes = express.Router();

routes.get('/add-wishlist-result/:id_service', WishlistPageController.addWishlistPage)

routes.get('/show-my-wishlist', WishlistPageController.showMyWishlistPage)

routes.get('/delete-wishlist-result/:id', WishlistPageController.deleteWishlistPage)

module.exports = routes