var express = require('express');
var router = express.Router();
var countries = require('../public/templates/countries.json')

router.get('/', function (req, res, next) {
    console.log(countries);
    res.render('events',{
        title: "Barnabas Nomo:: Events",
        countries:countries
    })
});

module.exports = router;