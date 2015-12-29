
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable('books', function (table) {
            table.string('author');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable('books', function (table) {
            table.dropColumn('author');
        })
};
