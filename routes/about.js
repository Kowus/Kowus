var express = require('express');
var router = express.Router();

/* GET about page*/
router.get('/', function (req, res, next) {
    res.render('about',
        {
            title: "About",
            marker: "a",
            next: "Activities"
        });
});

module.exports = router;