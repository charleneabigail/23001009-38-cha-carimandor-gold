const express = require ('express')
const routes = express.Router()
const userRoutes = require('./userRoutes')
const serviceRoutes = require('./serviceRoutes')
const wishlistRoutes = require('./wishlistRoutes')
const transactionRoutes = require ('./transactionRoutes')
const db = require('../db')

routes.get("/", async (req, res) => {
    const data = await db.select('*').from('employees')
    console.log(data);
    const json = {
        status : 'ok',
        data : data
    }
    res.send(json)
})



routes.use('/user', userRoutes)

routes.use('/service', serviceRoutes)

routes.use('/wishlist', wishlistRoutes)

routes.use('/transaction', transactionRoutes)

module.exports = routes