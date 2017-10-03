var express = require('express');
var router = express.Router();
var fs = require('fs'), path = require('path');
var Blog = require('../models/blog.model');
var axios = require('axios');
var redis = require('redis');
var moment = require('moment');
var redisURI = process.env.REDIS_URL || '';
var redis_cli = redis.createClient(redisURI, {no_ready_check: true});
redis_cli.on('error', function (err) {
    console.log("Error " + err);
});
var mutilpart = require('connect-multiparty');
var AWS = require('aws-sdk');

router.use('/upload/image', mutilpart());

AWS.config.update(
    {
        accessKeyId: process.env.S3_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });



router.get('/create', function (req, res, next) {

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
                var myQuote = response.data.contents.quotes[0];
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
router.get('/update', function (req, res, next) {
    Blog.aggregate([
        {$sort:{date:-1}}
    ]).exec(function (err, results) {
        if (err) {
            return res.render('error', {error: err, message: err.message})
        }
        results.forEach(function (item, index, array) {

            item.date = moment(results[index].date).fromNow();
            if (index === array.length - 1) {
                res.render('update-dash',
                    {
                        title: "Update Blog",
                        marker: "Barnabas Nomo",
                        next: "Home",
                        blogs: results
                    });
            }
        });

    });
});
router.get('/update/id/:id', function (req, res, next) {
    Blog.findOne({_id: req.params.id}).exec(function (err, blog) {
        if (err) {
            return console.log('an error has occurred' + err);
        }
        blog.date = moment(blog.date).format("dddd, MMMM Do YYYY");
        res.render('update-blog', {blog: blog, user: req.user})
    });
});


router.post('/create', function (req, res) {
    // console.log(req.body);
    var newBlog = new Blog();

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
router.post('/update', function (req, res) {
    var reqBody = req.body;
    console.log("Update Blog: " + reqBody.title);
    var pub = reqBody.publish === "yes";
    Blog.findOneAndUpdate(
        {
            _id: reqBody._id
        }, {
            title: reqBody.title,
            categories: reqBody.categories,
            content: reqBody.content,
            description: reqBody.description,
            publish: pub

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




router.post('/upload/image', function (req, res, next) {
    fs.readFile(req.files['images'].path, function (err, data) {
        var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
        var base64data = new Buffer.from(data, 'binary');
        var s3 = new AWS.S3();
        s3.upload(
            {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: "images/"+req.files['images'].name,
                Body: base64data,
                ACL: 'public-read'
            },
            options,
            function (err, data) {
                if (err) {
                    console.log(err);
                    return res.send(err)
                }
                console.log(data);
                res.send(data);
            });
    });
});

module.exports = router;