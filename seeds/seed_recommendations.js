exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('recommendations').del(),

        // Inserts seed entries
        knex('recommendations').insert({
            id: 1,
            user_id: 1,
            book_id: 3,
            created_at: new Date(),
            status: 0 // 0 for pending, 1 for rejected, 2 for done.
        }),
        knex('recommendations').insert({
            id: 2,
            user_id: 1,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 3,
            user_id: 2,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 4,
            user_id: 3,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 5,
            user_id: 4,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 6,
            user_id: 4,
            book_id: 5,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 7,
            user_id: 5,
            book_id: 4,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 8,
            user_id: 4,
            book_id: 1,
            created_at: new Date(),
            status: 1
        }),
        knex('recommendations').insert({
            id: 9,
            user_id: 4,
            book_id: 2,
            created_at: new Date(),
            status: 2
        }),
        knex('recommendations').insert({
            id: 11,
            user_id: 1,
            book_id: 3,
            created_at: new Date(),
            status: 0 // 0 for pending, 1 for rejected, 2 for done.
        }),
        knex('recommendations').insert({
            id: 12,
            user_id: 1,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 13,
            user_id: 2,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 41,
            user_id: 3,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 15,
            user_id: 4,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 16,
            user_id: 4,
            book_id: 5,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 17,
            user_id: 5,
            book_id: 4,
            created_at: new Date(),
            status: 0
        }),
        knex('recommendations').insert({
            id: 18,
            user_id: 4,
            book_id: 1,
            created_at: new Date(),
            status: 1
        }),
        knex('recommendations').insert({
            id: 19,
            user_id: 4,
            book_id: 2,
            created_at: new Date(),
            status: 2
        })
    );
};
