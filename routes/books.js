var express = require('express');
var router = express.Router();
var models = require('../models');

//router.get('/', function(req, res, next) {
//    //res.send('there are books.');
//    res.render('books', {
//
//    });
//
//
//
//});

router.get('/:id(\\d+)/', function(req, res) {

    res.render('books/detail/detail', {

    });
});

router.get('/:category([A-Z]?)', function(req, res, next) {

    var fetchAllCategory = models.Category
        .collection()
        .fetch();
    var promiseArray = [fetchAllCategory];
    if (req.params.category) {
        var fetchCategory = models.Category
            .where({char: req.params.category})
            .fetch();
        promiseArray.push(fetchCategory);
    };

    Promise.all(promiseArray)
        .then(function(data) {

            var allCategories = data[0];
            console.log(allCategories);
            if (!req.params.category) {
                var category = data[0];
                console.log(category);
                res.render('books', {
                    categories: allCategories.toJSON()
                });
            } else {
                /**
                 * If category exists, directly render the page.
                 * Otherwise, show error message.
                 */
                if (category) {
                    res.render('books', {
                        categories: allCategories.toJSON()
                    });
                } else {
                    res.render('books', {
                        categories: allCategories.toJSON(),
                        error: '没有这个分类~'
                    });
                }
            }

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


router.get('/detail', function (req, res) {
    res.render('books/detail', {

    });
});

//router.get('/detail/1', function(req, res) {
//    var id = req.params.id;
//    res.send(req.params);
//})

module.exports = router;
