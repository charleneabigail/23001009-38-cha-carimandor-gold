const db = require('../db')

class TransactionController {

    // 1. MELIHAT TRANSAKSI (DARI DATABASE)
    static async showTransaction(req, res) {
        try {
            let id_customer = req.params.id 
            const findUser = await db('transactions').select('*').where({id_customer : id_customer}); 
            if (!findUser.length) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }

            const dataTransaction = await db('transactions').select('*');
            return res.status(200).json(dataTransaction);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 2. MEMBUAT TRANSAKSI (MENYIMPAN KE DATABASE)
    static async addTransaction(req, res) {
        try {
            const {id_seller, id_customer, id_service, total_price, note_from_customer} = req.body;

            const findService = await db('services').where({id_seller: id_seller, id: id_service});
            if (!findService.length) {
                return res.status(404).json({
                    message : 'Service not found'
                })
            }

            const inputUser = {
                id_seller, 
                id_customer, 
                id_service, 
                snapshot_service: findService[0], 
                total_price, 
                transaction_date : new Date(), 
                status_payment: 'waiting_for_payment',
                note_from_customer,
                status : 'created',
                created_at : new Date(),
                updated_at : new Date(),
            }

            const findUser = await db('user').where({id: id_customer});
            if (!findUser.length) {
                return res.status(404).json({
                    message : 'User not found'
                })
            }

            const data = await db('transactions').insert(inputUser).returning('*');
            
            await db('wishlist').del().where({id_customer:id_customer, id_seller : id_seller, id_service : id_service}); // auto hapus wishlist ketika transaksi dibuat
            
            return res.status(201).json({
                message : 'Berhasil menambahkan transaksi!',
                data
            })
            

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 3. UPDATE STATUS PAYMENT SUCCESS (PATCH STATUS PAYMENT)
    static async updateStatusPaymentSucces(req, res) {
        try {
            const {id_transaction} = req.body;

            const input = {
                status_payment : 'payment_success',
                updated_at : new Date()
            }

            const data = await db('transactions').update(input).where({id : id_transaction});
            return res.status(200).json({
                message : 'payment success'
            })

        } catch(error) {
            res.status(500).json(error)
        }
    }

    // 4. UPDATE STATUS PAYMENT FAILED (PATCH STATUS PAYMENT)
    static async updateStatusPaymentFailed(req, res) {
        try {
            const {id_transaction} = req.body;

            const input = {
                status_payment : 'payment_failed',
                updated_at : new Date()
            }

            await db('transactions').update(input).where({id : id_transaction});
            return res.status(200).json({
                message : 'payment failed'
            })

        } catch(error) {
            res.status(500).json(error)
        }
    }

    // 5. CANCELED TRANSACTION BY CUSTOMER (PATCH STATUS)
    static async cancelTransactionByCustomer(req,res) {
        try {
            const {id, id_customer} = req.body
            const inputUser = {
                id,
                id_customer,
                status : 'canceled_by_customer',
                updated_at : new Date()
            }
            const findUser = await db('transactions').select('*').where({id : id, id_customer : id_customer});
            if(!findUser.length) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }

            await db('transactions').update(inputUser).where({id : id, id_customer : id_customer});
            return res.status(200).json({
                message : 'Transaction canceled'
            })

        } catch(error) {
            res.status(500).json(error)
        }
    }

    // 6. CANCELED TRANSACTION BY SELLER (PATCH STATUS)
    static async cancelTransactionBySeller(req,res) {
        try {
            const {id, id_seller} = req.body
            const inputUser = {
                id,
                id_seller,
                status : 'canceled_by_seller',
                updated_at : new Date()
            }
            const findUser = await db('transactions').select('*').where({id : id, id_seller : id_seller});
            if(!findUser.length) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }
            await db('transactions').update(inputUser).where({id : id, id_seller : id_seller});
            return res.status(200).json({
                message : 'Transaction canceled'
            })

        } catch(error) {
            res.status(500).json(error)
        }
    }
}


module.exports = TransactionController
