var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3307,
        user: 'library',
        password: 'library',
        database: 'library'
    }
});

var newBooks = [
    {
        name: 'A new book'
    },
    {
        name: 'A new book'
    },
    {
        name: 'A new book'
    },
    {
        name: 'A new book'
    }
];

module.exports = newBooks;