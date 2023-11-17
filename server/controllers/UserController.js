const db = require("../db");

class UserController {
  // 1. MELIHAT LIST USER (DARI DATABASE)
  static async showListUser(req, res) {
    try {
      const dataUser = await db("user").select("*");
      return res.status(200).json(dataUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // 2. MENAMPILKAN REGISTER PAGE DI BROWSER (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
  static showRegisterPage(req, res) {
    res.render("registerform");
  }

  // 3. FITUR REGISTER (MENYIMPAN DATA KE DATABASE)
  static async register(req, res) {
    try {
      const { name, password, email, phoneNumber, address, role } = req.body;
      const inputUser = {
        name,
        password,
        email,
        phone_number: phoneNumber,
        address,
        role,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const data = await db("user").insert(inputUser).returning("*");

      return res.status(201).json({
        message: "register berhasil!",
        data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // 4. MENAMPILKAN LOGIN PAGE DI BROWSER (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
  static showLoginPage(req, res) {
    res.render("loginform");
  }

  // 5. FITUR LOGIN, COMPARE INPUTAN KE DATABASE UNTUK BISA LOGIN (BISA INPUT DATA DARI BROWSER DAN POSTMAN)
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const inputUser = {
        email,
        password,
      };

      const data = await db("user")
        .where({
          email: email,
        })
        .select("password");
      console.log(data, "=======> ini data passwordnya");

      if (data.length) {
        if (data[0].password === password) {
          console.log(`login dengan nama ${email} berhasil!`);
          return res.status(200).json({
            message: "login berhasil",
          });
        } else {
          console.log("password anda salah!");
          res.status(400).json({
            message: "password anda salah",
          });
        }
      } else {
        console.log(`akun dengan email ${email} belum terdaftar!`);
        res.status(404).json({
          message: "anda belum terdaftar",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // 6. FITUR UPDATE DATA USER DI DATABASE
  static async editUser(req, res) {
    try {
      let id = req.params.id;
      const { name, password, email, phoneNumber, address, role } = req.body;

      const inputUser = {
        name,
        password,
        email,
        phone_number: phoneNumber,
        address,
        role,
        updated_at: new Date(),
      };

      const data = await db("user")
        .update(inputUser)
        .where({
          id: id,
        })
        .returning("*");

      res.status(200).json({
        message: "Update profile berhasil!",
        data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // 7. FITUR DELETE USER DI DATABASE BY ID
  static async deleteUserById(req, res) {
    try {
      let id = req.params.id;

      const data = await db("user").del(id).where({
        id: id,
      }).returning('id');
      console.log(data, "=====> data");
      res.status(200).json({
        message: `Delete profil dengan id ${id} berhasil!`,
      });
      
    } catch (error) {
      res.status(500).json(error);
    }
  }

    
}

module.exports = UserController;
