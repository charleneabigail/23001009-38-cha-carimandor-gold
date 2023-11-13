const express = require ('express')
const routes = express.Router()
const userRoutes = require('./userRoutes')
const serviceRoutes = require('./serviceRoutes')
const wishlistRoutes = require('./wishlistRoutes')
const transactionRoutes = require ('./transactionRoutes')
const userPageRoutes = require('./userPageRoutes')
const servicePageRoutes = require('./servicePageRoutes')
const searchPageRoutes = require('./searchPageRoutes')
const wishlistPageRoutes = require('./wishlistPageRoutes')
const transactionPageRoutes = require('./transactionPageRoutes')
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

routes.use('/userpage', userPageRoutes)

routes.use('/servicepage', servicePageRoutes)

routes.use('/search', searchPageRoutes)

routes.use('/wishlistpage', wishlistPageRoutes)

routes.use('/transactionpage', transactionPageRoutes)

module.exports = routes