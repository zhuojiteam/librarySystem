/**
 * Created by chenyulu on 15/12/18.
 */
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var models = require('../models');
var utils = require('../utils');
var middlewares = require('../middlewares');

var action = function (model, req) {
    var getAllPromise = model.collection()
        .fetch();

    return getAllPromise
        .then(function (_all) {
            var all = _all.toJSON();
            var promises = [];
            for (var i = 0; i < all.length; ++i) {
                var getRawBookInfoPromise = models.Book.where({
                    id: all[i].book_id
                }).fetch();
                promises.push(getRawBookInfoPromise);
            }
            console.log('promise all!');
            return Promise.all(promises).then(function (_data) {
                console.log('promise all done!');
                var data = [];
                for (var i = 0; i < all.length; i += 1) {
                    var datum = _data[i].toJSON();
                    console.log(datum);
                    datum.created_at = all[i].created_at;
                    var time = moment(all[i].created_at);
                    data.push({
                        id: all[i].id,
                        title: datum.title,
                        author: datum.author,
                        pub_info: datum.pub_info,
                        pub_year: datum.pub_year,
                        isbn: datum.isbn,
                        status: all[i].status,
                        created_at: time.format('YYYY-MM-DD, hh:mm:ss')
                    });
                }
                console.log('promise all data!');
                var viewData = {};
                var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;
                var pageSize = 20;
                var pages = utils.paginate(pageSize, data.length, pageNumber);
                if (data.length > pageSize) {
                    data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
                }
                viewData.pages = pages;
                viewData.entries = data;
                return viewData;
            })
        })
}

router.get('/history', function (req, res, next) {
    action(models.Recommendation, req)
        .then(function (viewData) {
            console.log(viewData);
            res.render('recommend/history', viewData)
        })
});


router.get('/create', middlewares.userAuth, function (req, res) {
    res.render('recommend/create', {});
});

router.post('/create', middlewares.userAuth, function (req, res) {
    models.Book
        .where({
            isbn: req.body.isbn
        })
        .fetch()
        .then(function (book) {
            if (book && book.get('status') === 0) {
                var error = '已经有了~'
                res.render('recommend/create', {
                    error: error
                });
            } else {
                var promise, message;
                if (book) {
                    promise = Promise.resolve(book);
                    message = '有人推荐过啦,但是已经记下了哦～';
                } else {
                    var newBook = _.assign({}, req.body);
                    newBook.status = 10;
                    // The category is left to the admin to add.
                    promise = models
                        .Book.forge(newBook).save();
                    console.log('Creating books:', newBook);
                    message = '成功~';
                }

                promise.then(function (book) {
                    var recommendation = {};
                    recommendation.book_id = book.get('id')
                    recommendation.created_at = new Date();
                    recommendation.user_id = req.user.id;
                    recommendation.status = 0; // 0 is unfulfilled.

                    console.log('Creating recommendation:', recommendation);
                    var createRecommendationPromise = models
                        .Recommendation.forge(recommendation).save();
                    createRecommendationPromise.then(function (data) {
                        console.log(data);
                        res.render('recommend/create', {
                            message: message
                        });
                    })
                })
            }
        })
});


module.exports = router;