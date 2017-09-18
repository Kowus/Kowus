// Axios
/*
var axios = require("axios");
axios.get('http://quotes.rest/qod.json').then(function (response) {
    console.log(response.data.contents.quotes[0]);
}).catch(function (err) {
    console.log(err.message);
});*/

// Moment JS
/*
var moment = require('moment');
// console.log(moment(new Date()).format("dddd, MMMM Do YYYY"));
console.log(moment(new Date()).format("YYYY-MM-DD"));
*/


// Firebase Storage
const firebase = require('firebase');
const keyFilename='./routes/bombaclat-baracuda-firebase-adminsdk-m622c-e7bcea0b15.json'; //replace this with api key file
const projectId = "bombaclat-baracuda"; //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const mime = require('mime');
const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);

const filePath = `./package.json`;
const uploadTo = `defo/mynigg/package.json`;
const fileMime = mime.lookup(filePath);

bucket.upload(filePath, {
    destination: uploadTo,
    public: true,
    metadata: { contentType: fileMime, cacheControl: "public, max-age=300" }
}, function (err, file) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(createPublicFileURL(uploadTo));
});




function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}
