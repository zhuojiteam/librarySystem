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

var models = require('./models');

var app = express();
var router = express.Router();

passport.use(new LocalStrategy(function(email, password, done) {
    new model.User({email: email}).fetch().then(function(data) {
        var user = data;
        if(user === null) {
            return done(null, false, {message: 'Invalid email or password'});
        } else {
            user = data.toJSON();
            if(!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: 'Invalid email or password'});
            } else {
                return done(null, user);
            }
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    new Model.User({username: username}).fetch().then(function(user) {
        done(null, user);
    });
});

// view engine setup

var server = app.listen(11011, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/recommend', recommend);
app.use('/admin', admin);
app.use('/test', test);
app.use('/account', router);

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
        console.log(err);
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
    models.User
        .where({
            name: req.body.name,
        })
        .fetch()
        .then(function (user) {
            console.log('=====');
            console.log(user);
            console.log('=====');
            if (user) {
                res.render('signup', {
                    error: '用户名已经存在!'
                });
            } else {

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
                            var formData = req.body;
                            formData.password = bcrypt.hashSync(formData.password);
                            models.User
                                .forge(formData)
                                .save()
                                .then(function (user) {
                                    console.log(user);
                                    res.render('signup', {});
                                });
                        }
                    });
            }
        });
});

router.get('/login', function (req, res, next) {
    //res.send('there are books.');
    res.render('login', {
    });
});

//router.post('/login', passport.authenticate('local'), function (req, res, next) {
//    //res.send('there are books.');
//    res.render('login', {
//        message: '登录成功!'
//    });
//});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'
}));

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
