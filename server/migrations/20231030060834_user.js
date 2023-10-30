/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
// atribut tabel user (id, name, password, email, phone number, address, role)
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary()
        table.string('name');
        table.string('password');
        table.string('email');
        table.string('phone_number');
        table.string('address');
        table.enu('role', ['customer', 'seller']);
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
