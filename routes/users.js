var express = require('express');
var router = express.Router();
var _ = require('lodash');

var middlewares = require('../middlewares');
var models = require('../models');
var utils = require('../utils');

/* GET users listing. */
//router.get('/shelf', function(req, res, next) {
//  res.render('users/shelf', {
//
//  //});
//});

router.get('/', function (req, res, next) {
    var getUserBorrowPromise = models.Borrow
        .where({
            user_id: req.user.id
        })
        .fetchAll();

    getUserBorrowPromise.then(function (_borrows) {
        var borrows = _borrows.toJSON();
        var getBookInfoPromises = [];
        console.log(borrows);
        for (var i = 0; i < borrows.length; ++i) {
            getBookInfoPromises.push(
                models.Book.where({
                    id: borrows[i].book_id
                }).fetch()
            )
        }
        console.log('promise all!');
        Promise.all(getBookInfoPromises).then(function (_data) {
            var data = [];
            for (var i = 0; i < borrows.length; ++i) {
                var datum = _data[i].toJSON();
                console.log(datum);
                datum.created_at = borrows[i].created_at;
                data.push({
                    title: datum.title,
                    author: datum.author,
                    pub_info: datum.pub_info,
                    pub_year: datum.pub_year,
                    isbn: datum.isbn,
                    status: borrows[i].status,
                    created_at: borrows[i].created_at
                });
            }
            console.log(data);
            var stata = {
                0: {
                    code: 0,
                    text: '借阅中'
                },
                1: {
                    code: 1,
                    text: '已归还'
                },
            }
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
            console.log(stata);

            var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;
            var pageSize = 20;
            var pages = utils.paginate(pageSize, data.length, pageNumber);
            if (data.length > pageSize) {
                data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
            }
            viewData.pages = pages;
            viewData.stata = stata;
            viewData.borrows = data;
            res.render('users/b_history', viewData);
        })
    });
});

router.get('/a_history', function (req, res, next) {

    var getUserAppointmentPromise = models.Appointment
        .where({
            user_id: req.user.id
        })
        .fetchAll();

    getUserAppointmentPromise.then(function (_appointments) {
        var appointments = _appointments.toJSON();
        var getBookInfoPromises = [];
        console.log(appointments);
        for (var i = 0; i < appointments.length; ++i) {
            getBookInfoPromises.push(
                models.Book.where({
                    id: appointments[i].book_id
                }).fetch()
            )
        }
        console.log('promise all!');
        Promise.all(getBookInfoPromises).then(function (_data) {
            var data = [];
            for (var i = 0; i < appointments.length; ++i) {
                var datum = _data[i].toJSON();
                console.log(datum);
                datum.created_at = appointments[i].created_at;
                data.push({
                    title: datum.title,
                    author: datum.author,
                    pub_info: datum.pub_info,
                    pub_year: datum.pub_year,
                    isbn: datum.isbn,
                    status: appointments[i].status,
                    created_at: appointments[i].created_at
                });
            }
            console.log(data);
            var stata = {
                0: {
                    code: 0,
                    text: '待处理'
                },
                1: {
                    code: 1,
                    text: '已借阅'
                },
            }
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
            console.log(stata);

            var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;
            var pageSize = 20;
            var pages = utils.paginate(pageSize, data.length, pageNumber);
            if (data.length > pageSize) {
                data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
            }
            viewData.pages = pages;
            viewData.stata = stata;
            viewData.appointments = data;
            res.render('users/a_history', viewData);
        })
    });
    
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
            var data = [];
            for (var i = 0; i < recommendations.length; ++i) {
                var datum = _data[i].toJSON();
                console.log(datum);
                datum.created_at = recommendations[i].created_at;
                data.push({
                    title: datum.title,
                    author: datum.author,
                    pub_info: datum.pub_info,
                    pub_year: datum.pub_year,
                    isbn: datum.isbn,
                    status: recommendations[i].status,
                    created_at: recommendations[i].created_at
                });
            }
            console.log(data);
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
            }
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
            console.log(stata);

            var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;
            var pageSize = 20;
            var pages = utils.paginate(pageSize, data.length, pageNumber);
            if (data.length > pageSize) {
                data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
            }
            viewData.pages = pages;
            viewData.stata = stata;
            viewData.recommendations = data;
            res.render('users/r_history', viewData);
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
