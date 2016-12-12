require('newrelic');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var sm = require('sitemap');


var index = require('./routes/index');
var about = require('./routes/about');
var work = require('./routes/work');
var blog = require('./routes/blog');
// var createBlog = require('./routes/createBlog');


var date = new Date();


var API_key = '9dafbeaaf3fa79ed66ef30c0e0b3b0eeb661b298f3f8d97eb8283f0cdd49';


var quickemailverification = require('quickemailverification').client(API_key).quickemailverification();

var app = express();
var mg_api_key = 'key-6039721ec9b6d1a5acbe90a165f49cb7';
var mg_domain = 'app7ed32d6b39d64559bce5341401045a42.mailgun.org';

var mailgun = require('mailgun-js')({apiKey: mg_api_key, domain: mg_domain});

app.locals.links = {
    /* social links */
    facebook: 'http://www.facebook.com/nomobarnabas',
    github: 'https://www.github.com/Kowus',
    linkedin: 'https://gh.linkedin.com/in/barnabas-nomo-386ab7109',
    twitter: 'https://twitter.com/midas_da_ace',
    instagram: 'https://www.instagram.com/tea_drama/',
    google_plus: '#'
};

// Sitemaps
var sitemap = sm.createSitemap ({
	hostname: 'http://www.kowus.xyz/',
	cacheTime: 600000,        // 600 sec - cache purge period
	urls: [
		{ url: '/',  changefreq: 'weekly', priority: 1 },
		{ url: '/about',  changefreq: 'weekly', priority: 0.7 },
		{ url: '/work',  changefreq: 'weekly',  priority: 0.7 },
		{ url: '/blog', changefreq: 'daily', priority: 0.9}    // changefreq: 'weekly',  priority: 0.5
		// { url: '/page-4/',   img: "http://urlTest.com" }
	]
});

app.get('/sitemap.xml', function(req, res) {
	sitemap.toXML( function (err, xml) {
		if (err) {
			return res.status(500).end();
		}
		res.header('Content-Type', 'application/xml');
		res.send( xml );
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
app.use('/work', work);
app.use('/blog', blog);
// app.use('/add/blog', createBlog);



app.post('/myapi', function (req, res) {
    var bodyJson = {
        name: req.body.name,
        mail: req.body.mail,
        mess: req.body.message

    };
    var dta = date.getUTCHours() + ':' + date.getUTCMinutes() + 'UTC';
    var data = {
        from: bodyJson.name + " <" + bodyJson.mail + ">",
        to: 'barnabas@elite-education.org',
        subject: 'New kowus.xyz ' + dta,
        text: bodyJson.mess
    };

    quickemailverification.verify(bodyJson.mail, function (err, response) {
        // console.log("Error: " + err);
        var smess = 0;
        var mstus = 0;

        if (err)
            smess = err;
        else {
            if (response.body.result == 'valid') {
                smess = 'Message Sent';
                mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                });


            }
            else {
                smess = 'Message not sent invalid Email:' + bodyJson.mail;
                mstus = 1;
            }
        }
        var billy = bodyJson;



        res.render('work', {
            title: "Work",
            marker: "Barnabas Nomo",
            next: "About",
            contact: "Contact Me",
            stat: smess,
            name: billy.name,
            email: billy.mail,
            message: billy.mess,
            mstus: mstus
        });

        console.log(smess);
        console.log(mstus);
    });


});


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
