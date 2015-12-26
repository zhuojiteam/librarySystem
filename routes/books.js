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
    res.render('books', {

    });



});

router.get('/:id(\\d+)/', function(req, res) {

    res.render('books/detail/detail', {

    });
});

router.get('/index', function(req, res, next) {
    //res.send('there are books.');
    knex.select('title', 'author', 'year').from('books').then(function(data){
//取到的数据
        res.json(data)
    });
});

router.get('/hot', function(req, res) {
   res.render('books/hot', {

   });
});

router.post('/hot', function(req, res) {
    console.log(req.body);
    knex('books').insert({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }).then(function() {
        res.render('books/create', {

        });
    });

});

router.get('/new', function (req, res) {
   res.render('books/new', {

   });
});


//router.get('/detail/1', function(req, res) {
//    var id = req.params.id;
//    res.send(req.params);
//})

module.exports = router;
