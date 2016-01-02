var bookshelf = require('./database/bookshelf');

var Book = bookshelf.Model.extend({
    tableName: 'books',
    author: function () {
        return this.belongsTo(Author);
    },
    category: function () {
        return this.belongsTo(Category);
    }
});

var User = bookshelf.Model.extend({
    tableName: 'users',
    recommendations: function () {
        return this.hasMany(Recommendation);
    }
});

var Category = bookshelf.Model.extend({
    tableName: 'categories',
    books: function () {
        return this.hasMany(Book);
    }
});

var Recommendation = bookshelf.Model.extend({
    tableName: 'recommendations',
    user: function () {
        return this.belongsTo(User);
    }
});

var Borrow = bookshelf.Model.extend({
    tableName: 'borrows',
    user: function () {
        return this.belongsTo(User);
    },
    book: function() {
        return this.hasOne(User);
    }
});

var Appointment = bookshelf.Model.extend({
    tableName: 'appointments',
    user: function () {
        return this.belongsTo(User);
    },
    book: function() {
        return this.hasOne(User);
    }
});

var Author = bookshelf.Model.extend({
    tableName: 'authors',
    books: function () {
        return this.hasMany(Book);
    }
});

module.exports = {
    Book: Book,
    User: User,
    Category: Category,
    Recommendation: Recommendation,
    Borrow: Borrow,
    Appointment: Appointment,
    Author: Author,
};