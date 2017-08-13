var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var Blog = require('../models/blog.model');
/*
var Dropbox = require('dropbox');
var dbx = new Dropbox({accessToken:'YyHAryjXCUsAAAAAAAAAMGuy13MV5_zjNTdRTdcrwQ1Bv1GXycbkNOCCFT_-ciGe'});
*/



// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

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
	newBlog.permalink = newBlog.title.trim().toLowerCase().split(/[\s,.]+/).join('_');
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
	 * tODO: create a means of saving a draft ie.. set interval to 180 seconds and use fs to write to text file or set a click event in angular to post to the server and have the database save the file.
	 *
	 * */
});

router.post('/Sjkqin28hn', function (req, res) {
	var reqBody = req.body;
	console.log("Update Blog: "+reqBody.title);
	Blog.findOneAndUpdate(
		{
			_id: reqBody._id
		}, {
			title:      reqBody.title,
			categories: reqBody.categories,
			content:    reqBody.content,
			description: reqBody.description

		}, function (err, result) {
			if ( err ) {
				res.send(err.message);
				return console.log(err.message);
			}
			else {
				console.log('Updated: '+result._id);
				res.render('success',{message:'successfully updated: '+result.title});
			}
		}
	);

});

module.exports = router;
