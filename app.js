var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var about = require('./routes/about');
var work = require('./routes/work');
//var contact = require('./routes/contact');


var API_key = '9dafbeaaf3fa79ed66ef30c0e0b3b0eeb661b298f3f8d97eb8283f0cdd49';


var quickemailverification = require('quickemailverification').client(API_key).quickemailverification();

var app = express();


app.locals.links = {
    /* social links */
    facebook: 'http://www.facebook.com/nomobarnabas',
    github: 'http://www.github.com/Kowus',
    linkedin: 'http://www.github.com/Kowus',
    twitter: 'http://www.github.com/Kowus',
    instagram: 'http://www.github.com/Kowus',
    google_plus: 'http://www.github.com/Kowus'
};

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
//app.use('/contact', contact);


app.post('/myapi', function (req, res) {
    var bodyJson = {
        name: req.body.name,
        mail: req.body.mail,
        mess: req.body.message

    };
    quickemailverification.verify(bodyJson.mail, function (err, response) {
        // console.log("Error: " + err);
        var smess = 0;

        if (err)
            smess = err;
        else {
            if (response.body.result == 'valid')
                smess = 'Message Sent';
            else
                smess = 'Message not sent invalid Email:'+bodyJson.mail;
        }


        console.log(bodyJson);
        res.render('work', {
            title: "Work",
            marker: "w",
            next: "About",
            contact: "Contact Me",
            stat: smess
        });
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
