var express = require('express');
var router = express.Router();

var hotBooks = require('../services/hot-books');
var newBooks = require('../services/new-books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '一个 图书馆', hotBookList: hotBooks, newBookList: newBooks });
});

module.exports = router;