var express = require('express');
var router = express.Router();
var _ = require('lodash');

var middlewares = require('../middlewares');
var models = require('../models');

/* GET users listing. */
//router.get('/shelf', function(req, res, next) {
//  res.render('users/shelf', {
//
//  //});
//});

router.get('/', function (req, res, next) {
    res.render('users/b_history', {});
});

router.get('/a_history', function (req, res, next) {

    res.render('users/a_history', {});
});

router.get('/r_history', function (req, res, next) {

    var getUserRecommendationPromise = models.Recommendation
        .where({
            user_id: req.user.id
        })
        .fetchAll();

    getUserRecommendationPromise.then(function (_recommendations) {
        var recommendations = _recommendations.toJSON();
        var getBookInfoPromises = [];
        console.log(recommendations);
        for (var i = 0; i < recommendations.length; ++i) {
            getBookInfoPromises.push(
                models.Book.where({
                    id: recommendations[i].book_id
                }).fetch()
            )
        }
        console.log('promise all!');
        Promise.all(getBookInfoPromises).then(function (_data) {
            var recommendationData = [];
            for (var i = 0; i < recommendations.length; ++i) {
                var datum = _data[i].toJSON();
                console.log(datum);
                datum.created_at = recommendations[i].created_at;
                recommendationData.push({
                    title: datum.title,
                    author: datum.author,
                    pub_info: datum.pub_info,
                    pub_year: datum.pub_year,
                    isbn: datum.isbn,
                    status: recommendations[i].status,
                    created_at: recommendations[i].created_at
                });
            }
            console.log(recommendationData);
            if (req.query.status) {
                var status = parseInt(req.query.status);
                recommendationData = _.filter(recommendationData, function(entry) {
                    return entry.status == status;
                });
            }
            res.render('users/r_history', {
                recommendations: recommendationData
            });
        })
    });


});

router.get('/setting', function (req, res, next) {
    res.render('users/setting', {});
});


router.get('/pwchange', function (req, res, next) {
    res.render('users/pwchange', {});
});

module.exports = router;
