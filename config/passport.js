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
        usernameField: "username",
        passwordField: "password",
        passReqToCallback:true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            User.findOne({"auth.username":username.toString().toLowerCase()}, function (err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username has already been used with an account.'))
                } else {
                    //	Username doesn't already exist
                    console.log(req.body);
                    User.findOne({"auth.email": req.body.email.toString().toLowerCase()}, function (err, uzer) {
                        if (err) return done(err);
                        if(uzer) return done(null, false, req.flash('signupMessage', 'That email has already been used with an account.'));
                        else {
                            // Email doesn't exist
                            //	Create User
                            var newUser = new User();

                            //	set User's local credentials
                            newUser.auth.email = req.body.email;
                            newUser.auth.password = newUser.generateHash(password);
                            newUser.firstname = req.body.firstname;
                            newUser.lastname = req.body.lastname;
                            newUser.auth.username= req.body.username;

                            //	save the user
                            newUser.save(function (err) {
                                if (err) throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        password: 'password',
        passReqToCallback: true
    },function (req, username, password, done) {
        User.findOne({'auth.username':username}, function (err, user) {
            if(err) return done(err);
            if (!user) return done(null, false, req.flash('loginMessage', 'No user found'));
            //	If user found but password is wrong
            if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Username or Password incorrect'));
            return done(null, user);
        })
    }));
};