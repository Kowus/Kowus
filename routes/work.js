var express = require('express');
var router = express.Router();
var Activities = require('../models/activities.model');
// var projects = require('./projects.json');
// var featured = require('../models/activities.json');
/* GET work page*/
router.get('/', function (req, res, next) {
    Activities.find({}).exec((err, activities) => {
        if (err) console.log(err);

        res.render('work',
            {
                title: "Activities",
                marker: "Barnabas Nomo",
                next: "About",
                contact: "Contact Me",
                activities: activities
            });
    });
});

module.exports = router;