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

router.get('/', function(req, res, next) {
    //res.send('there are books.');
    res.render('admin/admin', {

    });



});

module.exports = router;