
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable('recommendations', function (table) {
            table.string('author');
            table.string('title');
            table.string('pub_info');
            table.integer('pub_year');
            table.integer('isbn');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable('recommendations', function (table) {
            table.dropColumn('author');
            table.dropColumn('title');
            table.dropColumn('pub_info');
            table.dropColumn('pub_year');
            table.dropColumn('isbn');
        })
};
