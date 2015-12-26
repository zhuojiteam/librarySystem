/**
 * Created by chenyulu on 15/12/27.
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

router.get('/signup', function(req, res, next) {
    //res.send('there are books.');
    res.render('/signup', {

    });

});

router.get('/login', function(req, res, next) {
    //res.send('there are books.');
    res.render('/login', {

    });

});



module.exports = router;