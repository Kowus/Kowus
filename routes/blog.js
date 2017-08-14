var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../models/blog.model');
var db = process.env.MONGODB_URL_KOWUS;
mongoose.connect(db);
var moment = require('moment');


router.get('/', function (req, res, next) {
    Blog.find({}).exec(function (err, results) {
        var dumres = results;
        if (err) {
            return res.render('error', {error: err, message: err.message})
        }
        results.forEach(function (item, index, array) {
            var unique = moment(Date(results[index].date)).fromNow();
            item.date = unique;
            if (index === array.length - 1) {
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

    Blog.findOne({permalink: req.params.blog_title}).exec(function (err, blog) {
        if (err) {
            return console.log('an error has occurred' + err);
        }
        blog.date = moment(Date(blog.date)).format("dddd, MMMM Do YYYY");
        res.render('blog', {blog: blog})
    });
});

router.get('/id/:blog_id', function (req, res) {

    Blog.findOne({_id: req.params.blog_id}).exec(function (err, blog) {
        if (err) {
            return console.log('an error has occurred' + err);
        }
        blog.date = moment(Date(blog.date)).format("dddd, MMMM Do YYYY");
        res.render('blog', {blog: blog})
    });
});

module.exports = router;
