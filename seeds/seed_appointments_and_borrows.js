exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('appointments').del(),

        // Inserts seed entries
        knex('appointments').insert({
            id: 1,
            user_id: 4,
            book_id: 1,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            id: 2,
            user_id: 2,
            book_id: 1,
            created_at: new Date(),
            status: 0
        }),

        knex('borrows').del(),

        // Inserts seed entries
        knex('borrows').insert({
            id: 1,
            user_id: 3,
            book_id: 1,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            id: 2,
            user_id: 4,
            book_id: 1,
            created_at: new Date(),
            status: 0
        })
    );
};
