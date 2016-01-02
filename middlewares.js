module.exports = {
    user: function(req, res, next) {
        //console.log(req);
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    }
}