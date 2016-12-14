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
			next:   "Home",
			horror: ''
			
		});
	
	
});


router.post('/Nlw19i39Iw2', function (req, res) {
	// console.log(req.body);
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

router.post('/Sjkqin28hn', function (req, res) {
	var reqBody = req.body;
	console.log(req.body.title);
	Blog.update(
		{
			id: req.body.id
		}, {
			title:      req.body.title,
			categories: req.body.categories,
			content:    req.body.content,
			description: req.body.description
			
		}, function (err) {
			if ( err ) {
				res.send(err.message);
			}
			else {
				console.log(reqBody);
				res.send(reqBody);
			}
		}
	);
	/*Blog.find({}).exec(function (err, results) {
		if ( err ) {
			console.log('an error has occurred' + err);
		}
		else {
			console.log("loaded blogs");
			console.log(results);
		}
	});*/
	
});

module.exports = router;
