var express = require('express');
var router = express.Router();

/* GET work page*/
router.get('/', function (req, res, next) {
    res.render('work',
        {
            title: "Work",
            marker: "w",
            next: "About",
            contact: "Contact Me",
stat:''
        });
});

module.exports = router;