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
var passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    db = process.env.MONGODB_URL_KOWUS,
    redis = require('redis').createClient(process.env.REDIS_URL, {no_ready_check: true}),
    RedisStore = require('connect-redis')(session),
    helmet = require('helmet');
mongoose.connect(db);
mongoose.connection.on('error', function (err) {
    console.log("mongoose connection Error " + err);
});
var app = express();
app.use(helmet());
app.use(compression());


var index = require('./routes/index');
var about = require('./routes/about');
var work = require('./routes/work');
var blog = require('./routes/blog');
var events = require('./routes/events');
var curyear = new Date().getFullYear().toString();
app.locals = {
    links: require('./social-links.json'),
    Year: curyear
};

// passport
require('./config/passport')(passport);

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
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({client: redis})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes/admin')(app, passport);
app.use('/', index);
app.use('/about', about);
app.use('/activities', work);
app.use('/blog', blog);
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
