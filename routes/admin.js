/**
 * Created by chenyulu on 15/12/24.
 */
var express = require('express');
var _ = require('lodash');
var router = express.Router();

var middlewares = require('../middlewares');
var models = require('../models');
var utils = require('../utils');


var action = function (model, stata, req) {
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
                for (var i = 0; i < all.length; i += 2) {
                    var datum = _data[i].toJSON();
                    var users = _data[i + 1].toJSON();
                    console.log(datum);
                    datum.created_at = all[i].created_at;
                    data.push({
                        id: all[i].id,
                        email: users.email,
                        title: datum.title,
                        author: datum.author,
                        pub_info: datum.pub_info,
                        pub_year: datum.pub_year,
                        isbn: datum.isbn,
                        status: all[i].status,
                        created_at: all[i].created_at
                    });
                }
                console.log('promise all data!');
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
        .then(function(recommendation) {
           recommendation.set({
               status: action
           })
               .save()
               .then(function(recommendation) {
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
    res.render('admin/buy', {});
});


module.exports = router;