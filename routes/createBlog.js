const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let fs = require('fs'), path = require('path');
const Blog = require('../models/blog.model');
const axios = require('axios');
const redis = require('redis');
const moment = require('moment');
const redisURI = process.env.REDIS_URL || '';
const redis_cli = redis.createClient(redisURI, {no_ready_check: true});
redis_cli.on('error', function (err) {
    console.log("Error " + err);
});

router.get('/', function (req, res, next) {

    redis_cli.get(moment(new Date()).format("YYYY-MM-DD"), function (error, result) {
        if (result) {
            res.render('add-blog',
                {
                    title: "Create A New Blog",
                    marker: "blog",
                    next: "Home",
                    horror: '',
                    quote: JSON.parse(result),
                    user: req.user
                });
        } else {
            axios.get('http://quotes.rest/qod.json').then(function (response) {
                const myQuote = response.data.contents.quotes[0];
                redis_cli.setex(myQuote.date, 7200, JSON.stringify(myQuote));
                res.render('add-blog',
                    {
                        title: "Create A New Blog",
                        marker: "blog",
                        next: "Home",
                        horror: '',
                        quote: myQuote,
                        user: req.user
                    });
            }).catch(function (err) {
                console.log(err.message);
            });
        }
    });
});


router.post('/create', function (req, res) {
    // console.log(req.body);
    const newBlog = new Blog();

    newBlog.title = req.body.title;
    newBlog.permalink = newBlog.title.trim().toLowerCase().split(/[\s,.]+/).join('_');
    newBlog.content = req.body.content;
    newBlog.categories = req.body.categories;
    newBlog.description = req.body.description;
    newBlog.date = new Date().toISOString();
    newBlog.publish = req.body.publish === "yes";

    newBlog.save(function (err, blog) {
        if (err) {
            res.send("Error saving blog: " + err.message);
            return console.error(err.message);
        }
        else {
            console.log(blog);

            res.render("success", {message: 'successfully created: ' + blog.title});
        }

    });
    /*
     * tODO: create a means of saving a draft ie.. set interval to 180 seconds and use fs to write to text file or set a click event in angular to post to the server and have the database save the file.
     *
     * */
});

router.post('/update-blog', function (req, res) {
    const reqBody = req.body;
    console.log("Update Blog: " + reqBody.title);
    Blog.findOneAndUpdate(
        {
            _id: reqBody._id
        }, {
            title: reqBody.title,
            categories: reqBody.categories,
            content: reqBody.content,
            description: reqBody.description

        }, function (err, result) {
            if (err) {
                res.send(err.message);
                return console.log(err.message);
            }
            else {
                console.log('Updated: ' + result._id);
                res.render('success', {message: 'successfully updated: ' + result.title});
            }
        }
    );

});


module.exports = router;