const user = [];
class UserController {
    static showListUser (req, res) {
        let dataUser = {
            'list_user' : user
        }
        let manipulData = JSON.stringify(dataUser)
        res.render('listuser', {manipulData})
    }

    static register(req, res) {
        const { username, password } = req.body
        user.push({ username, password })
        console.log(`register dengan nama ${username} berhasil!`);
        res.status(201).send({
            status: 'ok',
            message: 'register berhasil!'
        })
    }
    
    static showLoginPage (req, res) {
        res.render('loginform')
    }

    static login (req, res) {
        const { username, password } = req.body
        let finduser = null
        for (let i = 0; i < user.length; i++) {
            if ( user[i].username === username) {
                finduser = user[i];
            }
        }
    
        if (finduser) {
            if (finduser.password === password) {
                console.log(`login dengan nama ${username} berhasil!`);
                return res.status(200).send({
                    status: 'ok',
                    message: 'login berhasil'
                })
            } else {
                console.log('password anda salah!');
                return res.status(400).send({
                    status: 'error',
                    message: 'password anda salah'
                })
            }
        } else {
            console.log(`akun dengan nama ${username} belum terdaftar!`);
            return res.status(404).send({
                status: 'error',
                message: 'anda belum terdaftar'
            })
        }
    }
}

module.exports = UserController