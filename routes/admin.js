module.exports = function (app, passport) {
    app.use('/!admin/dashboard/blog', isLoggedIn, require('./createBlog'));
    app.get('/!admin/login', isNotLoggedIn, function (req, res, next) {
        res.render('login', {message: req.flash('loginMessage')});
    });
    app.post('/!admin/login', isNotLoggedIn, passport.authenticate('local-login', {
        successRedirect: '/!admin/dashboard',
        failureRedirect: '/!admin/login',
        failureFlash: true
    }));
    app.get('/!admin/signup', function (req, res) {
        res.render('signup', {message: req.flash('signupMessage')});
    });
    app.post('/!admin/signup', passport.authenticate('local-signup', {
        successRedirect: '/!admin/dashboard',
        failureRedirect: '/!admin/signup',
        failureFlash: true
    }));
    app.get('/!admin/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard', {
            user: req.user // get the user out of session and pass to template
        });
    });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/!admin/login');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    res.redirect('/!admin/login');
}

// route middleware to make sure a user is logged in
function isNotLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        res.redirect('/!admin/dashboard');
    else
        return next();
}