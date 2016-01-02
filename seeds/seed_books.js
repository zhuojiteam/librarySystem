exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('books').del(),

        // Inserts seed entries
        knex('books').insert({
            id: 1,
            title: '偶记',
            pub_info: '这是伊本很难处的书',
            isbn: '1231-321-312312',
            lend_count: 3211,
            author: '设计复',
            stock: 33,
            pub_year: 1994,
            category_char: 'A'
        })
    );
};
