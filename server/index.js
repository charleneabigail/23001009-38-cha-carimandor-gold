const express = require('express');
const app = express();
const port = 3000 || procces.env.PORT;
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extend: true}))

app.use('/', routes)

const users = [];

app.get("/", (req, res) => {
    const json = {
        status : 'ok',
        data :'Hello World!'
    }
    res.send(json)
})

app.post('/register', (req,res) => {
    const { firstname, email } = req.body
    console.log((`${firstname} dan ${email}`));

    users.push({ firstname, email });

    res.status(201).json({
        'message': 'register berhasil!'
    })
})

app.get('/get-all-user', (req, res) => {
    const dateNow = new Date()

    const allUser = {
        timestamp: dateNow,
        data: users
    }

    res.send(allUser)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})