exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('appointments').del(),

        // Inserts seed entries
        knex('appointments').insert({
            id: 1,
        }),
        knex('appointments').insert({
            id: 2,
        }),

        knex('borrows').del(),

        // Inserts seed entries
        knex('borrows').insert({
            id: 1,
        }),
        knex('borrows').insert({
            id: 2,
        })
    );
};
