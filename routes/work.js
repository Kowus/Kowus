var express = require('express');
var router = express.Router();
var projects = require('./projects.json');

/* GET work page*/
router.get('/', function (req, res, next) {
    res.render('work',
        {
            title: "Activities",
            marker: "Barnabas Nomo",
            next: "About",
            contact: "Contact Me",
            projects: projects
        });
});

module.exports = router;