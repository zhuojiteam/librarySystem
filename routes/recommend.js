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

module.exports = router;