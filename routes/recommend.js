/**
 * Created by chenyulu on 15/12/18.
 */
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models');
var middlewares = require('../middlewares');

router.get('/history', function (req, res, next) {

    models.Recommendation
        .collection()
        .fetch()
        .then(function (recommendations) {
            var data = recommendations.toJSON();
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
                recommendations: data,

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
            res.render('recommend/history', viewData);
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
            if (book && book.get('status') === 10) {
                res.render('recommend/create', {
                    error: '已经有~'
                });
            } else {
                var recommendation = _.assign({}, req.body);
                recommendation.created_at = new Date();
                recommendation.status = 0; // 0 is unfulfilled.

                var book = _.assign({}, req.body);
                book.status = 10;
                // The category is left to the admin to add.

                var createRecommendationPromise = models
                    .Recommendation.forge(recommendation).save();
                var createBookRecommendation = models
                    .Book.forge(book).save();

                Promise.all([createBookRecommendation, createRecommendationPromise]).then(function (data) {
                    res.render('recommend/create', {
                        message: '成功~'
                    });
                })

            }
        })


});

module.exports = router;