
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable('recommendations', function (table) {
            table.integer('book_id');
            table.integer('user_id');
        })
        .alterTable('books', function (table) {
            table.string('category_char');
        })

};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable('recommendations', function (table) {
            table.dropColumn('book_id');
            table.dropColumn('user_id');
        })
        .alterTable('books', function (table) {
            table.dropColumn('category_string');
        })
};
