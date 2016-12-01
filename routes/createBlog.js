var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var Blog = require('./blog.model');



/* GET Blog page*/
router.get('/', function (req, res, next) {
	res.render('createBlog',
		{
			title: "Create A New Blog",
			marker: "blog",
			next: "Home"
		});
	console.log(__dirname);
	
});


router.post('/createbook', function (req, res) {
	
	var cats = 0;
	
	var newBlog = new Blog();
	
	newBlog.title = req.body.title;
	newBlog.content = req.body.author;
	newBlog.categories = req.body.categories;
	newBlog.description = req.body.description;
	
	newBlog.save(function (err, blog) {
		if ( err ) {
			res.send("Error saving book: " + err.message);
			return console.error(err.message);
		}
		else {
			console.log(book);
			res.send("Success");
		}
		
	});
	
});


module.exports = router;
