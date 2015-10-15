var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('there are books.');

})
module.exports = router;
