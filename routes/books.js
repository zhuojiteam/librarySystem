var express = require('express');
var router = express.Router();
var _ = require('lodash');

var models = require('../models');
var middlewares = require('../middlewares');


//router.get('/', function(req, res, next) {
//    //res.send('there are books.');
//    res.render('books', {
//
//    });
//
//
//
//});

router.post('/:id(\\d+)/', middlewares.userAuth, middlewares.categoryList, function (req, res) {
    var action = req.body.action;
    var book_id = req.body.book_id;
    
    var formData = {
        book_id: book_id,
        user_id: req.user.id
    };
    
    models.Appointment
        .where(formData).fetch()
        .then(function(data) {
           if (data) {
               req.flash('error', '已经预约啦!');
               res.render('books/detail', {});
           } else {
               formData.created_at = new Date();
               formData.status = 0;
               models.Appointment
                   .forge(formData).save()
                   .then(function (appointment) {
                       req.flash('error', '预约成功!');
                       res.redirect('/books/' + book_id);
                   })
           }
        });
});

router.get('/:id(\\d+)/', middlewares.categoryList, function (req, res) {
    models.Book
        .where({
            id: req.params.id
        })
        .fetch()
        .then(function (book) {
            if (book) {
                if (req.user) {
                    var bOrAStatus = {
                        b: 0,
                        a: 0
                    }
                    var borrowPromise = models.Borrow
                        .where({
                            user_id: req.user.id,
                            book_id: book.get('id')
                        }).fetch();
                    var appointPromise = models.Appointment
                        .where({
                            user_id: req.user.id,
                            book_id: book.get('id')
                        }).fetch();

                    Promise.all([borrowPromise, appointPromise])
                        .then(function(bOrA) {
                            if (bOrA[0]) {
                                bOrAStatus.b = 1;
                            }
                            if (bOrA[1]) {
                                bOrAStatus.a = 1;
                            }
                            res.render('books/detail', {
                                book: book.toJSON(),
                                bOrA: bOrAStatus
                            });
                        })
                } else {
                    res.render('books/detail', {
                        book: book.toJSON(),
                    });
                }
            } else {
                req.flash('error', '没有这本书!');
                res.render('books/detail', {});
            }

        })
});

router.get('/:id(\\d+)/edit', middlewares.categoryList, middlewares.adminAuth, function (req, res) {
    models.Book
        .where({
            id: req.params.id
        })
        .fetch()
        .then(function (book) {
            if (book) {
                res.render('books/edit', {
                    book: book.toJSON()
                });
            } else {
                req.flash('error', '没有这本书!');
                res.render('books/edit', {});
            }

        })
});

router.post('/:id(\\d+)/edit', middlewares.adminAuth, middlewares.categoryList, function (req, res) {
    models.Book
        .where({
            id: req.params.id
        })
        .fetch()
        .then(function (book) {
            if (book) {
                book.set(req.body).save()
                    .then(function(book) {
                        res.render('books/edit', {
                            book: book.toJSON()
                        });
                    })
            } else {
                req.flash('error', '没有这本书!');
                res.render('books/edit', {});
            }

        })
});

router.get('/:id(\\d+)/delete', middlewares.categoryList, middlewares.adminAuth, function (req, res) {
    models.Book
        .where({
            id: req.params.id
        })
        .destroy()
        .then(function (book) {
            res.redirect('/books', {});
        })
});

router.get('/:category([A-Z]?)', function (req, res, next) {

    var fetchAllCategory = models.Category
        .collection()
        .fetch();
    var promiseArray = [fetchAllCategory];
    if (req.params.category) {
        var fetchCategory = models.Category
            .where({char: req.params.category})
            .fetch();
        promiseArray.push(fetchCategory);
    }
    ;

    Promise.all(promiseArray)
        .then(function (data) {
            var allCategories = data[0];

            var category = data[1];
            console.log(category);
            /**
             * If category exists, directly render the page.
             * Otherwise, show error message.
             */
            var where = {}
            if (req.params.category) {
                where = {
                    category_char: category.get('char')
                }
            }
            if (!req.params.category || category) {
                models.Book
                    .where(where)
                    .fetchAll()
                    .then(function (books) {
                        var data = _.filter(books.toJSON(), function (book) {
                            return book.status != 10;
                        });
                        //console.log(books.toJSON());
                        var count = data.length;
                        var pageSize = 20;
                        var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;

                        var pages = [];
                        var totalPageNumber = Math.floor(parseInt(count - 1) / parseInt(pageSize)) + 1;
                        if (pageNumber > pageSize) pageNumber = pageSize;
                        if (pageNumber < 1) pageNumber = 1;
                        var i, j
                        console.log('pushing!', pageNumber, totalPageNumber);
                        for (
                            i = (pageNumber - 2 >= 1) ? pageNumber - 2 : 1, j = 0;
                            i <= totalPageNumber && j < 5;
                            ++i, ++j
                        ) {

                            pages.push({
                                active: (i == pageNumber),
                                number: i
                            })
                        }

                        if (data.length > pageSize) {
                            data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
                        }
                        var viewData = {
                            categories: allCategories.toJSON(),
                            books: data,
                            count: count,

                        }
                        if (pages.length > 0) {
                            viewData.pages = {
                                prev: {
                                    if: (pages[0].number - 1 >= 1),
                                    number: pages[0].number - 1
                                },
                                current: pages,
                                next: {
                                    if: (pages[pages.length - 1].number + 1 <= totalPageNumber),
                                    number: pages[pages.length - 1].number + 1
                                }
                            }
                        }
                        if (req.params.category) {
                            viewData.category = category.toJSON();
                        } else {
                            viewData.category = {
                                char: ''
                            }
                        }
                        res.render('books', viewData);
                    })

            } else {
                res.render('books', {
                    categories: allCategories.toJSON(),
                    error: '没有这个分类~'
                });
            }
            //}

        });
});

router.get('/index', function (req, res, next) {
    //res.send('there are books.');
    knex.select('title', 'author', 'year').from('books').then(function (data) {
//取到的数据
        res.json(data)
    });
});

router.get('/hot', function (req, res) {
    res.render('books/hot', {});
});

router.post('/hot', function (req, res) {
    console.log(req.body);
    knex('books').insert({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }).then(function () {
        res.render('books/create', {});
    });

});

router.get('/new', function (req, res) {
    res.render('books/new', {});
});


router.get('/detail', function (req, res) {
    res.render('books/detail', {});
});

//router.get('/detail/1', function(req, res) {
//    var id = req.params.id;
//    res.send(req.params);
//})

module.exports = router;
