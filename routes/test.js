var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function (req, res, next) {
    console.log('test!');

    models.Book
        .forge({
            title: '一本书'
        })
        .save()
        .then(function () {
            models.Book.collection().fetch().then(function (books) {
                res.send(books);
            })
        })


});

module.exports = router;