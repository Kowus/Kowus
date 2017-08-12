var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('./blog.model');

var db = process.env.MONGODB_URL_KOWUS;
// var db = 'mongodb://localhost/blogDB';
mongoose.connect(db);

/* GET about page*/
router.get('/alt', function (req, res, next) {
    res.render('blog-alt',
        {
            title: "Blog",
            marker: "Barnabas Nomo",
            next: "Home"
        });
});

router.get('/', function (req, res, next) {
    Blog.find({}).exec(function (err, results) {
        if (err) {
            res.render('error',{error:err, message:err.message})
        }
        else {
            // console.log();
            res.render('blog-dash',
                {
                    title: "Blog",
                    marker: "Barnabas Nomo",
                    next: "Home",
                    blogs: results
                });
        }
    });
});

router.get('/J2nmnk209olq1RWfiq', function (req, res) {
    // console.log('getting all blogs');
    Blog.find({}).exec(function (err, results) {
        if (err) {
            res.send('an error has occurred' + err);
        }
        else {
            console.log("loaded blogs");
            res.json(results);
        }
    });
});

router.get('/title/:blog_title', function (req, res) {
    /*var fullBlog = [];
    var sinBlog = [];
    Blog.find({}).exec(function (err, results) {
        if (err) {
            console.log('an error has occurred' + err);
            res.redirect('/alt');
        }
        else {
            console.log("loaded blogs");
            fullBlog = results;
        }
    });*/
    Blog.findOne({permalink: req.params.blog_title}).exec(function (err, blog) {
        if (err) {
            return console.log('an error has occurred' + err);
        }
        res.render('blog',{blog:blog})
    });
});

module.exports = router;
