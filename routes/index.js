var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {

      /* social links */
      /*
      facebook: 'http://www.facebook.com/nomobarnabas',
      github: 'http://www.github.com/Kowus',
      linkedin: 'http://www.github.com/Kowus',
      twitter: 'http://www.github.com/Kowus',
      instagram: 'http://www.github.com/Kowus',
      google_plus: 'http://www.github.com/Kowus',*/


  });
});

module.exports = router;
