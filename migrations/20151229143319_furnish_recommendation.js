
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable('recommendations', function (table) {
            table.datetime('created_at');
            table.integer('status');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable('recommendations', function (table) {
            table.dropColumn('created_at');
            table.dropColumn('status');
        })
};
