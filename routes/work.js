var express = require('express');
var router = express.Router();

/* GET work page*/
router.get('/', function (req, res, next) {
    res.render('work',
        {
            title: "Work",
            marker: "Barnabas Nomo",
            next: "About",
            contact: "Contact Me",
            stat: '',
            name: '',
            email: '',
            message: '',
            mstus: ''
        });
});

module.exports = router;