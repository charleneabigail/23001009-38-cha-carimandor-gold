const db = require("../db");

class UserPageController {
  // 1. MENAMPILKAN LANDING PAGE EJS
  static showLandingPage(req, res) {
    try {
      res.render("landingPage");
    } catch (error) {
      res.render("landingPage", {
        message: "Internal server error",
      });
    }
  }

  // 2. MENAMPILKAN LIST USER
  static async showListUserPage(req, res) {
    try {
      const dataUser = await db("user").select("*");
      console.log(dataUser);
      res.render("listUserPage", { dataUser });
    } catch (error) {
      res.render("listUserPage", {
        message: "Internal server error",
      });
    }
  }

  // 3. REGISTER
  // Menampilkan form untuk input usernya
  static showRegisterPage(req, res) {
    res.render("registerFormPage");
  }

  // Menampilkan pesan apakah inputnya berhasil / gagal
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
      res.render("registerFormResultPage", {
        isSuccess: true,
        message: "Register berhasil",
      });
    } catch (error) {
      res.render("registerFormResultPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }

  // 4. LOGIN
  // Menampilkan form untuk input usernya
  static showLoginPage(req, res) {
    res.render("loginFormPage");
  }

  // Menampilkan pesan apakah inputnya berhasil / gagal
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const inputUser = {
        email,
        password,
      };

      console.log('body ', req.body)

      console.log(req.session)
      const data = await db("user")
        .where({
          email: email,
        })
        .select('*');
      console.log(data, "=======> ini data password dan id customer");

      if (data.length) {
        if (data[0].password === password) {
          console.log(`login dengan nama ${email} berhasil!`);
          req.session.user = {
              id: data[0].id
            }

          res.render("loginFormResultPage", {
            isSuccess: true,
            role: data[0].role,
            message: "Login berhasil",
          });
        } else {
          console.log("password anda salah!");
            res.render("loginFormResultPage", {
            isSuccess: false,
            message: "password anda salah",
          });
        }
      } else {
        console.log(`akun dengan email ${email} belum terdaftar!`);
        res.render("loginFormResultPage", {
          isSuccess: false,
          message: "anda belum terdaftar",
        });
      }
    } catch (error) {
      console.log(error);
      res.render("loginFormResultPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }

  // 5. UPDATE PROFILE
  // Menampilkan form untuk input update profile
  static showEditUserPage(req, res) {
    const id = req.params.id;
    res.render("editUserFormPage", { id });
  }

  // Menampilkan pesan apakah inputnya berhasil / gagal
  static async editUserPage(req, res) {
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

      console.log(id, "======> ini id");

      const data = await db("user")
        .update(inputUser)
        .where({
          id: id,
        })
        .returning("*");

      res.render("editUserResultPage", {
        isSuccess: true,
        message: "Update profile berhasil",
      });
    } catch (error) {
      res.render("editUserResultPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }

  // 6. MENAMPILKAN HALAMAN DELETE PROFILE
  // Menampilkan pesan apakah inputnya berhasil / gagal
  static async deleteUserPage(req, res) {
    try {
      let id = req.params.id;

      const data = await db("user")
        .del(id)
        .where({
          id: id,
        })
        .returning("id");
      console.log(data, "=====> data");
      res.render("deleteUserResultPage", {
        isSuccess: true,
        message: `Delete profil dengan id ${id} berhasil!`,
      });
    } catch (error) {
      res.render("deleteUserResultPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = UserPageController;
