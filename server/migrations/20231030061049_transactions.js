/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
        // tabel transactions (id, id seller, id customer, id service, snapshot service, total price, transaction date, status payment, note from customer)
        table.increments('id').primary()
        table.integer('id_seller').notNullable().references('id').inTable('user').onDelete('CASCADE');;
        table.integer('id_customer').notNullable().references('id').inTable('user').onDelete('CASCADE');;
        table.integer('id_service').notNullable().references('id').inTable('services').onDelete('CASCADE');;
        table.json('snapshot_service');
        table.integer('total_price');
        table.dateTime('transaction_date');
        table.enu('status_payment', ['waiting_for_payment', 'payment_success', 'payment_failed'])
        table.text('note_from_customer');
        table.string('status'); // created, canceled by cust, canceled by seller
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transactions')
};
