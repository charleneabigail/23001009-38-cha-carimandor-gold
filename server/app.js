const express = require('express');
const app = express();
const port = process.env.port || 3000;
const routes = require('./routes')
const datas = require('./db/data.json')
const fs = require ('fs')
//const datas2 = fs.readFileSync('./db/data.json', utf-8)

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static('public'))

app.set('view engine', 'ejs')

//GET ALL DATA
app.get('/api/post', (req, res) => {
    res.status(200).json(datas)
})


// application level middleware
const applicationLevelMidware = (req, res, next) => {
    console.log('hit API');
    next()
}


app.use(applicationLevelMidware)
app.use('/', routes)


// middleware error handler
const errorMidware = (err, req, res, next) => {
    console.log(err);

    res.status(500).send({
        error: {
            status: 500,
            message: 'Internal server error'
        }
    })
}

app.use(errorMidware)


app.listen(port, () => {
    console.log(`running on port ${port}`);
})