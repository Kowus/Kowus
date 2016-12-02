var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var Blog = require('./blog.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET Blog page*/
router.get('/', function (req, res, next) {
	res.render('createBlog',
		{
			title:  "Create A New Blog",
			marker: "blog",
			next:   "Home"
		});
	// console.log(__dirname);
	
});


router.post('/Nlw19i39Iw2', function (req, res) {
	console.log(req.body);
	
	// var path = '/posts/' + newBlog.date + '.html'
	var cats = 0;
	
	
	var newBlog = new Blog();
	
	newBlog.title = req.body.title;
	newBlog.content = req.body.content;
	newBlog.categories = req.body.categories;
	newBlog.description = req.body.description;
	
	newBlog.save(function (err, blog) {
		if ( err ) {
			res.send("Error saving blog: " + err.message);
			return console.error(err.message);
		}
		else {
			console.log(blog);
			
			res.send("Success");
		}
		
	});
	
	/*
	 * tODO: create a means of saving a draft ie.. set interval to 180 seconds and use fs to write to text file or set a click
	 * event in angular to post to the server and have the database save the file.
	 *
	 * */
	
	
	
});


module.exports = router;
