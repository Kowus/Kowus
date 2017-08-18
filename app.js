require('dotenv').config();
require('newrelic');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var sm = require('sitemap');
var compression = require('compression');
// var Dropbox = require('dropbox');

var app = express();
app.use(compression());


var index = require('./routes/index');
var about = require('./routes/about');
var work = require('./routes/work');
var blog = require('./routes/blog');
var createBlog = require('./routes/createBlog');
var events = require('./routes/events');

var curyear = new Date().getFullYear().toString()
app.locals = {
    links: require('./social-links.json'),
    Year: curyear
}

// Sitemaps
var sitemap = sm.createSitemap({
    hostname: 'http://www.kowus.xyz/',
    cacheTime: 600000,        // 600 sec - cache purge period
    urls: [
        {url: '/', changefreq: 'weekly', priority: 1},
        {url: '/about', changefreq: 'weekly', priority: 0.6},
        {url: '/work', changefreq: 'weekly', priority: 0.2},
        {url: '/blog', changefreq: 'daily', priority: 0.9},    // changefreq: 'weekly',  priority: 0.5
        {url: '/events', changefreq: 'weekly', priority: 0.9}
        // { url: '/page-4/',   img: "http://urlTest.com" }
    ]
});

app.get('/sitemap.xml', function (req, res) {
    sitemap.toXML(function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send(xml);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/about', about);
app.use('/activities', work);
app.use('/blog', blog);
app.use('/add/blog', createBlog);
app.use('/events', events);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
