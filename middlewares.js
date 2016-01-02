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
    }
}