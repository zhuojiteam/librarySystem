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
            book_id: 20,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 1,
            book_id: 21,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 3,
            book_id: 22,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 4,
            book_id: 23,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 1,
            book_id: 24,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 1,
            book_id: 25,
            created_at: new Date(),
            status: 0
        }),
        knex('appointments').insert({
            user_id: 3,
            book_id: 26,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 2,
            book_id: 27,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 2,
            book_id: 28,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 4,
            book_id: 29,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 2,
            book_id: 30,
            created_at: new Date(),
            status: 1
        }),
        knex('appointments').insert({
            user_id: 3,
            book_id: 31,
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
         * Created by chenyulu on 16/1/3.
         */
        knex('borrows').insert({
            user_id: 3,
            book_id: 35,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 3,
            book_id: 36,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 3,
            book_id: 37,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 5,
            book_id: 38,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 6,
            book_id: 39,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 6,
            book_id: 39,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 5,
            book_id: 38,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 1,
            book_id: 39,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 1,
            book_id: 40,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 1,
            book_id: 41,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 2,
            book_id: 42,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 2,
            book_id: 43,
            created_at: new Date(),
            status: 0
        }),
        knex('borrows').insert({
            user_id: 2,
            book_id: 44,
            created_at: new Date(),
            status: 1
        }),
        knex('borrows').insert({
            user_id: 5,
            book_id: 45,
            created_at: new Date(),
            status: 0
        })
    );
};
