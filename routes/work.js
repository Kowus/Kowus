var express = require('express');
var router = express.Router();
var projects = require('./projects.json');
var featured = require('../models/activities.json');
/* GET work page*/
router.get('/', function (req, res, next) {
    res.render('work',
        {
            title: "Activities",
            marker: "Barnabas Nomo",
            next: "About",
            contact: "Contact Me",
            projects: projects,
            featured: featured
        });
});

module.exports = router;