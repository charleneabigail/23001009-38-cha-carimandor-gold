const express = require('express');
const WishlistController = require('../controllers/WishlistController');
const routes = express.Router()


routes.get('/show-wishlist/:id', WishlistController.showWishlist)

routes.post('/add-wishlist', WishlistController.addWishlist)

routes.put('/update-wishlist/:id', WishlistController.updateWishlist)

routes.delete('/delete-wishlist/:id', WishlistController.deleteWishlist)


module.exports = routes