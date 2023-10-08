const express = require ('express')
const routes = express.Router()
const userRoutes = require('./userRoutes')

routes.get("/", (req, res) => {
    const json = {
        status : 'ok',
        data :'Hello World!'
    }
    res.send(json)
})



routes.use('/user', userRoutes)


module.exports = routes