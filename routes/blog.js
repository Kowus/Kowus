var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('./blog.model');

var db = 'mongodb://kowus:Sff8gh6J@ds050879.mlab.com:50879/blogdb';
var db2 = 'mongodb://localhost/blogDB';
mongoose.connect(db);

/* GET about page*/
router.get('/', function (req, res, next) {
	res.render('blog',
		{
			title: "Blog",
			marker: "Barnabas Nomo",
			next: "Home"
		});
});

router.get('/J2nmnk209olq1RWfiq', function (req, res) {
	// console.log('getting all blogs');
		Blog.find({}).exec(function (err, results) {
			if ( err ) {
				res.send('an error has occurred' + err);
			}
			else {
				console.log("loaded blogs");
				res.json(results);
			}
		});
});

module.exports = router;
