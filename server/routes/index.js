const express = require ('express')
const routes = express.Router()
const userRoutes = require('./userRoutes')
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


module.exports = routes