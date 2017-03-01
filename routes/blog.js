var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('./blog.model');

var db = process.env.MONGODB_URL_KOWUS;
// var db2 = 'mongodb://localhost/blogDB';
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
    var blogs = [];
    Blog.find({}).exec(function (err, results) {
        if (err) {
            console.log('an error has occurred' + err);
            res.redirect('/alt');
        }
        else {
            // console.log();
            res.render('blog',
                {
                    title: "Blog",
                    marker: "Barnabas Nomo",
                    next: "Home",
                    blogInfo: results,
                    current: 0
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

router.get('/id/:blog_id', function (req, res) {
    var fullBlog = [];
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
    });
    Blog.find({_id: req.params.blog_id}).exec(function (err, results) {
        if (err) {
            console.log('an error has occurred' + err);
            res.redirect('/alt');
        }
        else {
            console.log("loaded blogs");
            sinBlog = results;
        }
        res.render('blog',
            {
                title: "Blog",
                marker: "Barnabas Nomo",
                next: "Home",
                blogInfo: fullBlog,
                singleBlog: sinBlog,
                current: 0
            });
    });
});

module.exports = router;
