//const user = [];
const dbUser = require('../db/user.json');
const fs = require('fs')



class UserController {

    // 1. MELIHAT LIST USER (BISA DIJALANKAN DARI BROWSER DAN POSTMAN)
    static showListUser (req, res) {
        try {
            const dbUserString = fs.readFileSync('./db/user.json')
            const dbUser = JSON.parse(dbUserString)
            res.status(200).json(dbUser)
        } catch (error) {
            res.status(500).json(error)
        }
        
        // let dataUser = {
        //     'list_user' : user
        // }
        // let manipulData = JSON.stringify(dataUser)
        // res.render('listuser', {manipulData})
    }

    // 2. MENAMPILKAN REGISTER PAGE DI BROWSER (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
    static showRegisterPage (req, res) {
        res.render('registerform')
    }

    // 3. FITUR REGISTER, MENYIMPAN DATA KE DB (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
    static register(req, res) {
        try {
            const { username, fullName, email, phoneNumber, adress, password } = req.body

            // a. cara ini bisa dipakai kalau tidak ada fitur delete user,
            // tapi jika ada fitur delete user maka setelah delete data dan post data baru, maka id akan ada yg double
            // let id = dbUser.dataUser.length + 1;

            // b. cara sesuai last data id
            const dbUserString = fs.readFileSync('./db/user.json')
            const dbUser = JSON.parse(dbUserString)
            console.log(dbUser);

            let id = 1;
            if (dbUser.dataUser.length > 0) {
                id = dbUser.dataUser[dbUser.dataUser.length -1].id + 1
            }
            // console.log(id, '=======> cek id');

            dbUser.dataUser.push({ id, username, fullName, email, phoneNumber, adress, password })
            console.log(`register dengan nama ${username} berhasil!`);
        
            fs.writeFileSync('./db/user.json', JSON.stringify(dbUser))
            res.status(201).send({
                message: 'register berhasil!'
            })
            } catch (error) {
                res.status(500).json (error)
        }
    }
    
    // 4. MENAMPILKAN LOGIN PAGE DI BROWSER (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
    static showLoginPage (req, res) {
        res.render('loginform')
    }

    // 5. FITUR LOGIN, COMPARE INPUTAN KE DATA USER UNTUK BISA LOGIN (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
    static login (req, res) {
        try {
            const { username, password } = req.body

            const dbUserString = fs.readFileSync('./db/user.json')
            const dbUser = JSON.parse(dbUserString)
            // console.log(dbUser);

            let finduser = null
            for (let i = 0; i < dbUser.dataUser.length; i++) {
                if ( dbUser.dataUser[i].username === username) {
                    finduser = dbUser.dataUser[i];
                }
            }
        
            if (finduser) {
                if (finduser.password === password) {
                    console.log(`login dengan nama ${username} berhasil!`);
                    return res.status(200).send({
                        message: 'login berhasil'
                    })
                } else {
                    console.log('password anda salah!');
                    return res.status(400).send({
                        message: 'password anda salah'
                    })
                }
            } else {
                console.log(`akun dengan nama ${username} belum terdaftar!`);
                return res.status(404).send({
                    message: 'anda belum terdaftar'
                })
            }
            } catch (error) {
                res.status(500).json(error)
            }
    }

    // 6. FITUR UPDATE DATA USER (BARU BISA INPUT DARI POSTMAN)
    static editUser(req, res) {
        try {
            let id = req.params.id
            // console.log(id, '===========> id yang diedit');
            const { username, fullName, email, phoneNumber, adress, password } = req.body

            const dbUserString = fs.readFileSync('./db/user.json')
            const dbUser = JSON.parse(dbUserString)
            console.log(dbUser);

            let findId
        
            for (let i = 0; i < dbUser.dataUser.length; i++) {
                if (dbUser.dataUser[i].id == id) {
                    findId = dbUser.dataUser[i]
                    
                }
            }
            if (!findId) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }
            findId.username = username;
            findId.fullName = fullName;
            findId.email = email;
            findId.phoneNumber = phoneNumber;
            findId.adress = adress;
            findId.password = password;

            fs.writeFileSync('./db/user.json', JSON.stringify(dbUser))
            res.status(200).json({
                message : `Data atas nama ${username} berhasil diupdate`
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 7. FITUR DELETE ALL USER (BARU BISA DELETE DARI POSTMAN)
    static deleteAllUser(req, res) {
        try {
            fs.writeFileSync('./db/user.json', JSON.stringify({"dataUser" : []}))
            res.status(200).json({message : 'Sukses menghapus semua data user'})
        } catch (error) {
            res.status(500).json(error)
        }

    }

    // 8. FITUR DELETE USER BY ID (BARU BISA DELETE DARI POSTMAN)
    static deleteUserById(req, res) {
        try {
            let id = req.params.id

            const dbUserString = fs.readFileSync('./db/user.json')
            const dbUser = JSON.parse(dbUserString)
            console.log(dbUser);

            let newArr = []
            for ( let i = 0; i < dbUser.dataUser.length; i++) {
                if (dbUser.dataUser[i].id != id) {
                    newArr.push(dbUser.dataUser[i])

                    console.log(newArr, '========> data setelah didelete');
                }
            }
            if (newArr.length == dbUser.dataUser.length) {
                console.log(dbUser.dataUser.length, '========> panjang dataUser');
                return res.status(404).json({
                    message : 'Data not found'
                })
            }
            fs.writeFileSync('./db/user.json', JSON.stringify({"dataUser" : newArr}))
            res.status(200).json({
                message : 'Delete data success'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController