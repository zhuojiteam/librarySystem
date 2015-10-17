var express = require('express');
var router = express.Router();

var hotBooks = require('../services/hot-books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lulu的图书馆', bookList: hotBooks });
});

module.exports = router;
