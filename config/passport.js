var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');

module.exports= function (passport) {
    passport.serializeUser(function (req, user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (req, id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
    });

    // Local Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: "username"
    }))
};