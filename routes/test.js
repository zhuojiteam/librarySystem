var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res, next) {
    console.log('test!');
    models.Book.collection().fetch().then(function (books) {
        res.send('test!');
    })
});

module.exports = router;