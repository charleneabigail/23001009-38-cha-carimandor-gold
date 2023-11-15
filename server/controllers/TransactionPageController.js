const db = require("../db");

class TransactionPageController {
  // 1. MENAMPILKAN FORM UNTUK MEMBUAT TRANSAKSI
  static async addTransactionForm(req, res) {
    try {
      const findService = await db("services")
        .select("*")
        .where({ id: req.params.id });

      if (!findService.length) {
        return res.render("addTransactionFormPage", {
          isSuccess: false,
          message: "Service tidak ditemukan",
        });
      }

      return res.render("addTransactionFormPage", {
        isSuccess: true,
        service: findService[0],
      });
    } catch (error) {
      res.render("addTransactionFormPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }

  // 2. MENAMBAHKAN TRANSAKSI
  static async addTransaction(req, res) {
    try {
      const id_customer = req.session.user.id;
      const {
        // id_seller,
        // id_customer,
        // id_service,
        quantity,
        note_from_customer,
      } = req.body;

      const {id_service} = req.params;

      const findService = await db("services")
        .select("*")
        .where({ id: id_service });
      if (!findService.length) {
        return res.render({
          isSuccess: false,
          message: "Service not found",
        });
      }

      const id_seller = findService[0].id_seller;

      const total_price = quantity * findService[0].price;

      const inputUser = {
        id_seller,
        id_customer,
        id_service,
        snapshot_service: findService[0],
        total_price,
        transaction_date: new Date(),
        status_payment: "waiting_for_payment",
        note_from_customer,
        status: "created",
        created_at: new Date(),
        updated_at: new Date(),
      };

      // const findUser = await db('user').where({id: id_customer}); =======> SUDAH DIHANDLE SESSION
      // if (!findUser.length) {
      //     return res.status(404).json({
      //         message : 'User not found'
      //     })
      // }

      const data = await db("transactions").insert(inputUser).returning("*");

      await db("wishlist").del().where({
        id_customer: id_customer,
        id_seller: id_seller,
        id_service: id_service,
      }); // auto hapus wishlist ketika transaksi dibuat

      return res.render('addTransactionResultPage', {
        isSuccess: true,
        message: "Berhasil menambahkan transaksi!",
        data,
      });
    } catch (error) {
      console.log(error)
      res.render('addTransactionResultPage',{
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }
  
  // 3. MENAMPILKAN TRANSAKSI SAYA
  static async showMyTransaction(req, res) {
    try {
      const myTransaction = await db("transactions")
      .select(['transactions.id', 'services.title'])
      .join('services', 'transactions.id_service', '=', 'services.id')
      .where({'transactions.id_customer': req.session.user.id})
      console.log(myTransaction, '=====> myTransaction');
      res.render('showMyTransactionPage', {myTransaction})
    } catch (error) {
      res.render('showMyTransactionPage', {
        isSuccess: false,
        message: 'Internal server error'
      })
    }
  }
  
  
}




module.exports = TransactionPageController;
