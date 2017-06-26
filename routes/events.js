var express = require('express');
var router = express.Router();
var countries = require('./countries.json');

router.get('/', function (req, res, next) {

    res.render('events',{
        title: "Barnabas Nomo:: Events",
        // countries:Object.keys(countries)
    })
});

module.exports = router;