module.exports = {
    user: function(req, res, next) {
        //console.log(req);
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    },
    userAuth: function(req, res, next) {
        if (!(req.user)) {
            console.log(req);
            res.redirect('/account/login?redirect=' + req.originalUrl);
        } else {
            next();
        }
    },
    initLink: function(req, res, next) {
        var newLink = function() {
            return [
                {
                    url: '/',
                    text: '首页'
                },
                {
                    url: '/books',
                    text: '书库博览'
                },
                {
                    url: '/recommend/history',
                    text: '读者荐购'
                },
                {
                    url: '/users',
                    text: '个人中心'
                }
            ]
        };
        res.locals.links = newLink();
        next();
    }
}