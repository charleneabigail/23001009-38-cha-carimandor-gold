const db = require("../db");

class WishlistPageController {
  // 1. MENAMBAHKAN KE WISHLIST
  static async addWishlistPage(req, res) {
    try {
      const id_customer = req.session.user.id;

      const {
        // id_seller,
        // id_customer,
        id_service,
        // total_price,
        // note_from_customer,
      } = req.params;

      const findService = await db("services").where({
        // id_seller: id_seller,
        id: id_service,
      });
      if (!findService.length) {
        return res.render("addWishlistResultPage", {
          isSuccess: false,
          message: "Jasa tidak ditemukan",
        });
      }

      const inputUser = {
        id_seller: findService[0].id_seller, // DIAMBIL DARI DB SERVICES
        id_customer, // DIAMBIL DARI SESSION
        id_service: parseInt(id_service), // DIAMBIL DARI REQ.PARAMS
        total_price: 0,
        // note_from_customer,
        created_at: new Date(),
        updated_at: new Date(),
      };

      console.log(inputUser);

      const data = await db("wishlist").insert(inputUser).returning("*");
      res.render("addWishlistResultPage", {
        isSuccess: true,
        message: "Berhasil menambahkan wishlist!",
        data,
      });
    } catch (error) {
      console.log(error);
      res.render("addWishlistResultPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }

  // 2. MENAMPILKAN WISHLIST SAYA
  static async showMyWishlistPage(req, res) {
    try {
        const myWishlist = await db("wishlist")
          .select(['wishlist.id', 'services.title', 'wishlist.id_service'])
          .join("services", "wishlist.id_service", "=", "services.id")
          .where({ 'wishlist.id_customer': req.session.user.id })
          .orderBy('wishlist.updated_at', 'desc');

          console.log(myWishlist,'=====>myWishlist');

        res.render("showMyWishlistPage", { myWishlist });
      } catch (error) {
        console.log(error);
        res.render("showMyWishlistPage", {
          isSuccess: false,
          message: "Internal server error",
        });
    }
}

  // 3. MENGHAPUS WISHLIST
  static async deleteWishlistPage(req, res) {
    try {
      const id_customer = req.session.user.id;
      let id = req.params.id;

      await db("wishlist").del(id).where({ id: id, id_customer }).returning("id");
      res.render("deleteWishlistResultPage", {
        isSuccess: true,
        message: `Delete wishlist dengan id ${id} berhasil!`,
      });
    } catch (error) {
      res.render("deleteWishlistResultPage", {
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = WishlistPageController;
