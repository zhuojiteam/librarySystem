/**
 * Created by chenyulu on 15/12/27.
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

var models = require('../models');

router.get('/signup', function(req, res, next) {
    //res.send('there are books.');
    res.render('signup', {

    });

});

router.post('/signup', function(req, res, next) {
    //res.send('there are books.');
    console.log(req.body);
    models.User
        .where(req.body)
        .fetch()
        .then(function(user) {
            if (user) {
                res.render('signup', {
                    error: '用户已经存在!'
                });
            } else {
                var formData = req.body;
                formData.password = bcrypt.hashSync(formData.password);
                models.User
                    .forge(formData)
                    .save()
                    .then(function(user) {
                        console.log(user);
                        res.render('signup', {
                        });
                    });
            }
        });
});

router.get('/login', function(req, res, next) {
    //res.send('there are books.');
    res.render('login', {

    });

});



module.exports = router;