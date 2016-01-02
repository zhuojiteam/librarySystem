exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('recommendations').del(),

        // Inserts seed entries
        knex('recommendations').insert({
            id: 1,
            user_id: 1,
            book_id: 1,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 2,
            user_id: 1,
            book_id: 2,
            created_at: new Date(),
            status: 0
        })
    );
};
