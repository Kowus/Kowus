var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('./blog.model');
var db = 'mongodb://localhost/blogdb';

mongoose.connect(db);

/* GET about page*/
router.get('/', function (req, res, next) {
	res.render('blog',
		{
			title: "Blog",
			marker: "Barnabas Nomo",
			next: "Activities"
		});
});

router.get('/J2nmnk209olq1RWfiq', function (req, res) {
	// console.log('getting all blogs');
		Blog.find({}, { _id: 0,__v:0 }).exec(function (err, results) {
			if ( err ) {
				res.send('an error has occurred' + err);
			}
			else {
				console.log(results);
				res.json(results);
			}
		});
});

module.exports = router;
