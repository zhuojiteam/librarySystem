/**
 * Created by chenyulu on 15/12/18.
 */
var express = require('express');
var router = express.Router();
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3307,
        user: 'library',
        password: 'library',
        database: 'library'
    }
});

router.get('/history', function(req, res, next){
    res.render('recommend/history', {

    });
});


router.get('/create', function(req, res) {
   res.render('recommend/create', {

   });
});

module.exports = router;