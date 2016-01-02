var express = require('express');
var router = express.Router();
var models = require('../models');

var hotBooks = require('../services/hot-books');
var newBooks = require('../services/new-books');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.locals.links[0].active = true;
    next();
}, function (req, res, next) {


    res.render('index', {title: '一个 图书馆', hotBookList: hotBooks, newBookList: newBooks});
});

module.exports = router;