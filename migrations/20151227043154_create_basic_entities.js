
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('books', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.string('detail');
            table.string('pub_info');
            table.string('isbn');
            table.integer('lend_count');
            table.integer('total_lend_count');
            //table.integer('author_id');
            table.integer('stock');
            table.integer('status');
        })
        .createTable('categories', function (table) {
            table.increments('id').primary();
            table.string('char');
            table.string('name');
        })
        .createTable('recommendations', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.string('detail');
            table.string('pub_info');
            table.integer('pub_year');
            table.string('isbn');
            table.string('author');
        })
        .createTable('appointments', function (table) {
            table.increments('id').primary();
            table.integer('book_id');
            table.integer('status');
            table.datetime('created_at');
            table.datetime('fullfilled_at');
        })
        .createTable('borrows', function (table) {
            table.increments('id').primary();
            table.integer('book_id');
            table.integer('status');
            table.datetime('borrowed_at');
            table.datetime('returned_at');
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
            table.integer('permission');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('books')
        .dropTable('categories')
        .dropTable('recommendations')
        .dropTable('appointments')
        .dropTable('borrows')
        .dropTable('authors')
        .dropTable('users');
};