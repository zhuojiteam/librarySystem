
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('books', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.string('pub_info');
            table.string('isbn');
            table.integer('lend_count');
            table.integer('total_lend_count');
            //table.integer('author_id');
            table.integer('stock');
        })
        .createTable('categories', function (table) {
            table.increments('id').primary();
            table.string('char');
            table.string('name');
        })
        .createTable('recommendations', function (table) {
            table.increments('id').primary();
        })
        .createTable('authors', function (table) {
            table.increments('id').primary();
            table.string('name');
        })
        .createTable('users', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('password');
            table.string('email');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('books')
        .dropTable('categories')
        .dropTable('recommendations')
        .dropTable('authors')
        .dropTable('users');
};