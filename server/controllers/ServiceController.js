const db = require("../db")


class ServiceController {

    // 1. MELIHAT LIST SERVICE (DARI DATABASE)
    static async showListServices(req, res) {
        try {
            const dataServices = await db('services').select('*');
            res.status(200).json(dataServices); 
        } catch (error) {
            res.status(500).json(error)
        }
    }


    // 2. MENAMBAHKAN SERVICE (MENYIMPAN DATA KE DATABASE)
    static async addService(req, res) {
        try {
            const {id_seller, title, description, status, category, sub_category, price, photo, link_portofolio} = req.body;

            const inputUser = {
                id_seller, 
                title,
                description,
                status, 
                category, 
                sub_category, 
                price, 
                photo, 
                link_portofolio,
                created_at : new Date(),
                updated_at : new Date(),
            }

            const findUser = await db('user').where({ id: id_seller });
            if (!findUser.length) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }

            const data = await db('services').insert(inputUser).returning('*')
            res.status(201).json({
                message : 'Berhasil menambahkan service!',
                data
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 3. UPDATE SERVICE DI DATABASE
    static async updateService(req, res) {
        try {
            const id = req.params.id;
            const {id_seller, title, description, status, category, sub_category, price, photo, link_portofolio} = req.body;

            const inputUser = {
                id_seller,
                title,
                description,
                status, 
                category, 
                sub_category, 
                price, 
                photo, 
                link_portofolio,
                updated_at : new Date(),
            }

            const findService = await db('services').select('*').where({ id: id, id_seller : id_seller});
            if (!findService.length) {
                return res.status(404).json({
                    message: 'Data not found'
                })
            }

            const data = await db('services').update(inputUser).where({id : id}).returning('*');
            res.status(200).json({
                message : 'Update service berhasil!',
                data,
            });
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // 4. MENGHAPUS SERVICE DARI DATABASE
    static async deleteService(req, res) {
        try {
            let id = req.params.id;

            let id_seller = req.query.id_seller
            const findUser = await db('services').select('*').where({id : id, id_seller : id_seller});
            if (!findUser.length) {
                return res.status(404).json({
                    message : 'Data not found'
                })
            }

            const data = await db('services').del(id).where({id: id, id_seller : id_seller}).returning('id')
            res.status(200).json({
                message : `Delete service dengan id ${id} berhasil!`,
                data
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }


}

module.exports = ServiceController