const db = require('../db')

class WishlistController {

    // 1. MELIHAT ISI WISHLIST (DARI DATABASE)
    static async showWishlist(req, res) {
        try {
            const id_customer = req.params.id;
            const findUser = await db('wishlist').where({id_customer : id_customer});
            if (!findUser.length) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }
            const dataWishlist = await db('wishlist').where({id_customer : id_customer}); 
            return res.status(200).json(dataWishlist);
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 2. MEMBUAT WISHLIST (MENYIMPAN KE DATABASE)
    static async addWishlist(req, res) {
        try {
            const {id_seller, id_customer, id_service, total_price, note_from_customer} = req.body;

            const inputUser = {
                id_seller, 
                id_customer, 
                id_service, 
                total_price, 
                note_from_customer,
                created_at : new Date(),
                updated_at : new Date(),
            }

            const findUser = await db('user').where({id: id_customer});
            if (!findUser.length) {
                return res.status(404).json({
                    message : 'User not found'
                })
            }

            const findService = await db('services').where({id_seller: id_seller, id: id_service});
            if (!findService.length) {
                return res.status(404).json({
                    message : 'Service not found'
                })
            }

            const data = await db('wishlist').insert(inputUser).returning('*');
            return res.status(201).json({
                message : 'Berhasil menambahkan wishlist!',
                data
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 3. UPDATE WISHLIST DI DATABASE
    static async updateWishlist(req, res) {
        try {
            const id = req.params.id;
            const {id_seller, id_customer, id_service, total_price, note_from_customer} = req.body;

            const inputUser = {
                id_seller, 
                id_customer, 
                id_service, 
                total_price, 
                note_from_customer,
                updated_at : new Date(),
            }

            const findWishlist = await db('wishlist').select('*').where({id: id, id_customer: id_customer, id_service: id_service});
            if (!findWishlist.length) { 
                return res.status(404).json({
                    message: 'Data not found'
                })
            }
            const data = await db('wishlist').update(inputUser).where({id: id, id_customer: id_customer}).returning('*');
            return res.status(200).json({
                message : 'Update wishlist berhasil!',
                data,
            });
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 4. MENGHAPUS WISHLIST DARI DATABASE
    static async deleteWishlist(req, res) {
        try {
            let id = req.params.id;

            let id_customer = req.query.id_customer
            const findUser = await db('wishlist').select('*').where({id : id, id_customer : id_customer});
            if (!findUser.length) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }

            const data = await db('wishlist').del(id).where({id: id}).returning('id');
            return res.status(200).json({
                message : `Delete wishlist dengan id ${id} berhasil!`,
                data
            });
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = WishlistController