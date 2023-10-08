const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static('public'))

app.set('view engine', 'ejs')


// application level middleware
const applicationLevelMidware = (req, res, next) => {
    console.log('hit API');
    next()
}


app.use(applicationLevelMidware)
app.use('/', routes)


// middleware error handler
const errorMidware = (err, req, res, next) => {
    console.log('ini error');

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