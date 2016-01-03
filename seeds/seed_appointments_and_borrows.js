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

        knex('appointments').insert({
            user_id: 1,
            book_id: 10,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 1,
            book_id: 1,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 3,
            book_id: 2,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 4,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 1,
            book_id: 4,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 1,
            book_id: 5,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 3,
            book_id: 6,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 2,
            book_id: 7,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 2,
            book_id: 8,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 4,
            book_id: 9,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 2,
            book_id: 0,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 3,
            book_id: 1,
            created_at: new Date(),
            status: 1
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
        }),
        /**
         * Created by chenyulu on 6/1/3.
         */
        knex('borrows').insert({
            user_id: 3,
            book_id: 5,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 3,
            book_id: 6,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 3,
            book_id: 7,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 5,
            book_id: 8,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 6,
            book_id: 9,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 6,
            book_id: 9,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 5,
            book_id: 8,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 1,
            book_id: 9,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 1,
            book_id: 0,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 1,
            book_id: 1,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 2,
            book_id: 2,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 2,
            book_id: 3,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 2,
            book_id: 4,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 5,
            book_id: 5,
            created_at: new Date(),
            status: 0
        })
    );
};
