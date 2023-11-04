/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const currentDate = new Date()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wishlist').del()
  await knex('wishlist').insert([
    {
      id_seller: 5, 
      id_customer: 1, 
      id_service: 1 , 
      total_price: 20000000 , 
      note_from_customer: 'deadline design tanggal 1 november 2023',
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 5, 
      id_customer: 1, 
      id_service: 2 , 
      total_price: 15000000 , 
      note_from_customer: 'deadline design tanggal 1 november 2023',
      created_at: currentDate,
      updated_at: currentDate,
    },
  
  ]);
};

