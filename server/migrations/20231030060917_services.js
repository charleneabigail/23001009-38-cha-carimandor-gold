/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('services', (table) => {
        // tabel services (id, id seller, title, description, status, category, sub category, price, photo, link portofolio)
        table.increments('id').primary()
        table.integer('id_seller').notNullable().references('id').inTable('user');
        table.string('title');
        table.text('description');
        table.enu('status', ['harga satuan', 'borongan']);
        table.string('category');
        table.string('sub_category');
        table.integer('price');
        table.string('photo');
        table.string('link_portofolio');
        table.timestamp('created_at');
        table.timestamp('updated_at');

    })
    
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('services')
};
