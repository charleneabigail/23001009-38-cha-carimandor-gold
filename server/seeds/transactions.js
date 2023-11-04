/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const currentDate = new Date()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('transactions').insert([
    {
      id_seller: 5, 
      id_customer: 1, 
      id_service: 1, 
      snapshot_service : {zzz:'zzz'},
      total_price: 20000000, 
      transaction_date: currentDate,
      status_payment: 'waiting_for_payment',
      note_from_customer: 'deadline design tanggal 1 november 2023',
      status : 'created',
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 5, 
      id_customer: 1, 
      id_service: 2, 
      snapshot_service : {zzz:'zzz'},
      total_price: 15000000, 
      transaction_date: currentDate,
      status_payment: 'waiting_for_payment',
      note_from_customer: 'deadline design tanggal 1 november 2023',
      status : 'created',
      created_at: currentDate,
      updated_at: currentDate,
    },
 
  ]);
};
