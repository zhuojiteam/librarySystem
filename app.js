var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var recommend = require('./routes/recommend');
var admin = require('./routes/admin');
var test = require('./routes/test');
var account = require('./routes/account');

var middlewares = require('./middlewares');

var models = require('./models');

var app = express();
var router = express.Router();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    'use strict'
    console.log('======\nLogging in!\n======');
    console.log(email);
    console.log(password);
    new models.User({email: email})
        .fetch()
        .then(function (user) {
            console.log('feteched user: ');
            console.log(user);
            if (!user) {
                return done(null, false);
            } else {
                var fetchedPassword = user.get('password');
                console.log('Fetched password is ', fetchedPassword);
                if (!bcrypt.compareSync(password, fetchedPassword)) {
                    return done(null, false);
                } else {
                    var userData = {
                        name: user.get('name'),
                        email: user.get('email'),
                        permission: user.get('permission')
                    }
                    console.log('User data is: ');
                    console.log(userData);
                    return done(null, userData);
                }
            }
        });
}));

passport.serializeUser(function (user, done) {
    console.log('Serializing user!');
    console.log(user);
    done(null, user);
    //done(null, user.name);
});

passport.deserializeUser(function (user, done) {
    console.log('Deserializing user!');
    console.log(user);
    done(null, user)
    //new models.User({name: name}).fetch().then(function(user) {
    //    done(null, user);
    //});
});

// view engine setup

var server = app.listen(11011, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'secret strategic xxzzz code',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('flash')());
app.use(require('./middlewares').user)
app.use(require('./middlewares').initLink)

app.use('/', routes);
app.use('/users', middlewares.userAuth ,function (req, res, next) {
    res.locals.links[3].active = true;
    next();
}, users);
app.use('/books', function (req, res, next) {
    res.locals.links[1].active = true;
    next();
}, books);
app.use('/recommend', function (req, res, next) {
    res.locals.links[2].active = true;
    next();
}, recommend);
app.use('/admin',middlewares.adminAuth ,function (req, res, next) {
    res.locals.links[4].active = true;
    next();
}, admin);
app.use('/test', test);
app.use('/account', function (req, res, next) {
    next();
}, router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 定义icon图标
//app.use(favicon(__dirname + '/public/favicon.ico'));


// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.stack);
    res.render('error', {
        message: err.message,
        error: err
    });
});
//}


router.get('/signup', function (req, res, next) {
    //res.send('there are books.');
    res.render('signup', {});

});

router.post('/signup', function (req, res, next) {
    //res.send('there are books.');
    console.log(req.body);
    //models.User
    //    .where({
    //        name: req.body.name,
    //    })
    //    .fetch()
    //    .then(function (user) {
    //        console.log('=====');
    //        console.log(user);
    //        console.log('=====');
    //        if (user) {
    //            res.render('signup', {
    //                error: '用户名已经存在!'
    //            });
    //        } else {

                models.User
                    .where({
                        email: req.body.email,
                    })
                    .fetch()
                    .then(function (user) {
                        console.log('=====');
                        console.log(user);
                        console.log('=====');
                        if (user) {
                            res.render('signup', {
                                error: 'Email 已经存在!'
                            });
                        } else {
                            var formData = {
                                name: req.body.name,
                                email: req.body.password
                            };
                            formData.permission = 0;
                            formData.password = bcrypt.hashSync(req.body.password);
                            req.body.password = undefined;
                            models.User
                                .forge(formData)
                                .save()
                                .then(function (user) {
                                    console.log(user);
                                    //res.render('signup', {});
                                    console.log('Logining after signing up with: ');
                                    console.log(req.body);
                                    req.login(req.body, function (err) {
                                        if (err) {
                                            console.log(err)
                                        }
                                        return res.redirect('/')
                                    })
                                });
                        }
                    });
        //    }
    //});
});

router.get('/login', function (req, res, next) {
    //res.send('there are books.');
    res.render('login', {});
});

//router.post('/login', passport.authenticate('local'), function (req, res, next) {
//    //res.send('there are books.');
//    res.render('login', {
//        message: '登录成功!'
//    });
//});

router.post('/login', function (req, res, next) {
    var redirectUrl = (req.query.redirect) ? req.query.redirect : '/';
    passport.authenticate('local', {
        successRedirect: redirectUrl,
        failureRedirect: '/account/login',
        failureFlash: 'Invalid username or password.',
        successFlash: 'Welcome!',
        session: true
    })(req, res, next)
});

// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


module.exports = app;
