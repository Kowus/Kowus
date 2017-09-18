const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let fs = require('fs'), path = require('path');
const Blog = require('../models/blog.model');
const axios = require('axios');
const redis = require('redis');
const moment = require('moment');
const mime = require('mime');
const redisURI = process.env.REDIS_URL || '';
const redis_cli = redis.createClient(redisURI, {no_ready_check: true});
const firebase = require('firebase');
const fileUpload = require('express-fileupload');
const projectId = "bombaclat-baracuda";
const keyFileName = "./bombaclat-baracuda-firebase-adminsdk-m622c-e7bcea0b15.json";
const googleStorage = require('@google-cloud/storage');
const storage = googleStorage({
    projectId, keyFileName
});
const bucketName = `${projectId}.appspot.com`;

const bucket = storage.bucket(bucketName);

redis_cli.on('error', function (err) {
    console.log("Error " + err);
});
router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
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
/*
router.post('/upload-file', multer.single('file'), function (req, res, next) {
    const file = req.file;
    if (file) {
        uploadImageToStorage(file).then(function(success) {

            res.status(200).send("S U C C E S S");
            console.log('upload image');
    }).catch(function(error)  {
            console.error(error);
    });
    }
});
*/
router.post('/upload-file', function (req, res, next) {
    const file = req.files.image;
    const uploadTo = `images/${file.name}`
    if (file) {
        fs.writeFile(`./uploads/${file.name}`, file.data, (err) => {
            if (err) return console.error(err);
            else {
                console.log('The file has been saved!');
                bucket.upload(`./uploads/${file.name}`, {
                    destination: `images/${file.name}`,
                    public: true,
                    metadata: {contentType: file.mimetype, cacheControl: "public, max-age=300"}
                }, function (err, myFile) {
                    if (err) {
                        res.json(req.files);
                        return console.log(err);
                    }
                    console.log(createPublicFileURL(`images/${myFile}`));
                    console.log(createPublicFileURL(`images/${file.name}`));
                    res.send('success');
                });
            }
        });


    }
});

module.exports = router;


function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}


/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
/*
const uploadImageToStorage = (file) => {
    let prom = new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
    return prom;
};*/
