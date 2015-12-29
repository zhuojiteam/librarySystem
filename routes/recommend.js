/**
 * Created by chenyulu on 15/12/18.
 */
var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/history', function(req, res, next){

    models.Book.where();

    res.render('recommend/history', {

    });
});


router.get('/create', function(req, res) {
   res.render('recommend/create', {

   });
});

router.post('/create', function(req, res) {
    models.Book
        .where({
            isbn: req.body.isbn
        })
        .fetch()
        .then(function(book) {
            if (book) {
                res.render('recommend/create', {
                    error: '已经有~'
                });
            } else {
                var recommendation = req.body;
                recommendation.created_at = new Date();
                recommendation.status = 0;
                models.Recommendation
                    .forge(recommendation)
                    .save();
            }
            res.render('recommend/create', {
                message: '成功~'
            });
        })


});

module.exports = router;