/**
 * Created by chenyulu on 15/12/24.
 */
var express = require('express');
var _ = require('lodash');
var router = express.Router();
var moment = require('moment');

var middlewares = require('../middlewares');
var models = require('../models');
var utils = require('../utils');


var action = function (model, stata, req) {
    var getAllPromise = model.collection()
        .fetch();

    return getAllPromise
        .then(function (_all) {
            var all = _all.toJSON();
            console.log(all);
            var promises = [];
            for (var i = 0; i < all.length; ++i) {
                var getRawBookInfoPromise = models.Book.where({
                    id: all[i].book_id
                }).fetch();
                var getUserInfoPromise = models.User.where({
                    id: all[i].user_id
                }).fetch();
                promises.push(getRawBookInfoPromise);
                promises.push(getUserInfoPromise);
            }
            console.log('promise all!');
            return Promise.all(promises).then(function (_data) {
                console.log('promise all done!');
                var data = [];
                for (var i = 0; i < _data.length; i += 2) {
                    var users = _data[i + 1].toJSON();

                    var time = moment(all[i / 2].created_at);
                    data.push({
                        id: all[i / 2].id,
                        email: users.email,
                        title: _data[i].get('title'),
                        author: _data[i].get('author'),
                        pub_info: _data[i].get('pub_info'),
                        pub_year: _data[i].get('pub_year'),
                        isbn: _data[i].get('isbn'),
                        status: all[i / 2].status,
                        created_at: time.format('YYYY-MM-DD, hh:mm:ss'),
                        user_id: _data[i + 1].get('id'),
                        book_id: _data[i].get('id')
                    });
                }
                console.log('promise all data!', data);
                var viewData = {};
                if (req.query.status) {
                    var status = parseInt(req.query.status);
                    data = _.filter(data, function (entry) {
                        return entry.status == status;
                    });
                    console.log(status);
                    stata[status].active = true;
                    viewData.activeStatus = status;
                }
                console.log('stata', stata);
                var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;
                var pageSize = 20;
                var pages = utils.paginate(pageSize, data.length, pageNumber);
                if (data.length > pageSize) {
                    data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
                }
                viewData.pages = pages;
                viewData.stata = stata;
                viewData.entries = data;
                return viewData;
            })
        })
}


router.get('/', function (req, res, next) {
    var stata = {
        0: {
            code: 0,
            text: '借阅中'
        },
        1: {
            code: 1,
            text: '已归还'
        }
    };
    action(models.Borrow, stata, req).then(function (viewData) {
        console.log(viewData);
        res.render('admin/admin', viewData);
    })

});
router.get('/appoint', function (req, res, next) {
    var stata = {
        0: {
            code: 0,
            text: '待处理'
        },
        1: {
            code: 1,
            text: '已借阅'
        },
    };
    action(models.Appointment, stata, req).then(function (viewData) {
        console.log(viewData);
        res.render('admin/appoint', viewData);
    })

});

router.get('/recommend', function (req, res, next) {
    //res.send('there are books.');
    var stata = {
        0: {
            code: 0,
            text: '待处理'
        },
        1: {
            code: 1,
            text: '不订购'
        },
        2: {
            code: 2,
            text: '已订购'
        }
    };
    action(models.Recommendation, stata, req).then(function (viewData) {
        console.log(viewData);
        res.render('admin/recommend', viewData);
    })
});

router.post('/recommend/:id(\\d+)', function (req, res, next) {
    // Discard or approve the recommendation.
    var id = parseInt(req.params.id);
    var action = parseInt(req.body.status);
    console.log(id);
    models.Recommendation.where({
        id: id
    }).fetch()
        .then(function (recommendation) {
            recommendation.set({
                    status: action
                })
                .save()
                .then(function (recommendation) {
                    console.log(req.body);
                    var url = '/admin/recommend';
                    if (req.body.incoming != '-1') {
                        url += '?status=' + req.body.incoming;
                    }
                    res.redirect(url);
                })
        });
});

router.get('/buy/:id(\\d+)', function (req, res, next) {
    //res.send('there are books.');
    var id = req.params.id;
    console.log(id);
    models.Recommendation.where({
        id: id
    }).fetch().then(function (recommendation) {
        console.log('fetched recommendations');
        models.Book.where({
            id: recommendation.get('book_id')
        }).fetch().then(function (book) {
            console.log('fetched books');
            if (book && book.status == 0) {
                res.render('admin/buy', {
                    book: book.toJSON(),
                    recommendation: recommendation.toJSON()
                });
            } else {
                req.flash('书已经有啦');
                res.render('admin/buy', {
                    book: book.toJSON(),
                    recommendation: recommendation.toJSON()
                });
            }
        })

    });

});

router.post('/buy/:id(\\d+)', function (req, res, next) {
    console.log(req.body);
    //res.send('there are books.');
    var id = req.params.id;
    models.Recommendation.where({
        id: id
    }).fetch().then(function (recommendation) {
        console.log('fetched recommendation');
        models.Book.where({
            id: recommendation.get('book_id')
        }).fetch().then(function (book) {
            console.log('fetched book', book.toJSON);
            if (book && book.get('status') != 0) {
                book.set({
                    status: 0,
                    stock: req.body.amount,
                    category_char: req.body.category,
                    detail: req.body.detail
                }).save().then(function (_book) {
                    console.log('fetched _book');
                    models.Recommendation.where({
                        book_id: _book.get('id')
                    }).fetchAll().then(function (_recommendations) {
                        console.log(_recommendations.toJSON());
                        console.log('fetched recommendations');
                        var now = new Date();
                        var fullfillRecommendationPromise = _recommendations.map(function (elem) {
                            return elem
                                .set({
                                    status: 2,
                                    fullfilled_at: now
                                })
                                .save();
                        })
                        Promise.all(fullfillRecommendationPromise).then(function (_recommendations) {
                            req.flash('info', '购买成功!');
                            res.redirect('/books/' + book.get('id'));
                        })
                    });
                })
            } else {
                req.flash('error', '早就买过啦!');
                res.redirect('/books/' + book.get('id'));
            }
        })

    });

});


module.exports = router;