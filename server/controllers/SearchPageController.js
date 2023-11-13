const db = require("../db")

class SearchPageController {
    // 1. MENAMPILKAN HALAMAN PERCARIAN SERVICE UNTUK DIINPUT KE WISHLIST
    static async showSearchPage(req, res) {
        const dataServices = await db('services').select('*');
        console.log(dataServices, '=======>');
        res.render('searchPage', {dataServices})
    }
  
}


module.exports = SearchPageController
