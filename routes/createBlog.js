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
var uploader = require('express-fileuploader');
var S3Strategy = require('express-fileuploader-s3');
var AWS = require('aws-sdk');

router.use('/upload/image', mutilpart());

AWS.config.update(
    {
        accessKeyId: process.env.S3_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });

uploader.use(new S3Strategy({
    uploadPath: '/uploads',
    headers: {
        'x-amz-acl': 'public-read'
    },
    options: {
        key: process.env.S3_KEY_ID,
        secret: process.env.S3_SECRET_ACCESS_KEY,
        bucket: process.env.S3_BUCKET_NAME
    }
}));


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
router.post('/update-blog', function (req, res) {
    var reqBody = req.body;
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
/*
router.post('/upload/image', function (req, res, next) {
    uploader.upload('s3', req.files['images'], function (err, files) {
        if (err) {
            return next(err);
        }
        res.send(JSON.stringify(files));
    });
});
*/

router.post('/upload/image', function (req, res, next) {
    var base64data = new Buffer.from(req.files['images'], 'binary');
    var s3 = new AWS.S3();

    s3.upload({
        Bucket:process.env.S3_BUCKET_NAME,
        Key: 'del2.txt',
        Body: base64data,
        ACL: 'public-read'
    }, function (err, data) {
        if (err) throw err;
        console.log(data);
        res.send(data);
    })
});

module.exports = router;