/**
 * Created by chenyulu on 15/12/24.
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

var middlewares = require('../middlewares');
router.use(middlewares.userAuth);
router.get('/', function (req, res, next) {
    //res.send('there are books.');
    res.render('admin/admin', {});

});
router.get('/appoint', function (req, res, next) {
    //res.send('there are books.');
    res.render('admin/appoint', {});

});
router.get('/recommend', function (req, res, next) {
    //res.send('there are books.');
    res.render('admin/recommend', {});

});
router.get('/buy', function (req, res, next) {
    //res.send('there are books.');
    res.render('admin/buy', {});

});

module.exports = router;