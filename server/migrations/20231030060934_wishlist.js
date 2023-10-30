/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('wishlist', (table) => {
        // tabel wishlist (id, id seller, id customer, id service, total price, note from customer)
        table.increments('id').primary()
        table.integer('id_seller').notNullable().references('id').inTable('user');
        table.integer('id_customer').notNullable().references('id').inTable('user');
        table.integer('id_service').notNullable().references('id').inTable('services');
        table.integer('total_price');
        table.text('note_from_customer');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('wishlist')
};
