
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable('books', function (table) {
            table.integer('pub_year');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable('books', function (table) {
            table.dropColumn('pub_year');
        })
};
