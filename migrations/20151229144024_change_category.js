
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable('categories', function (table) {
            table.dropColumn('id');
            table.primary('char');
        })

};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable('categories', function (table) {
            table.increments('id');
            table.primary('id');
        })
};
