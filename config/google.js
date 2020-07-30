var mongoose=require('mongoose')
var mongodb=require('mongodb')
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
const keys=require('./passport-google');
var User=require('../models/User');
let ObjectID = require('mongodb').ObjectID;

var conn=mongoose.connect('mongodb://localhost:27017/add',{ useNewUrlParser: true,useUnifiedTopology: true })

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "http://localhost:3000/auth/google/redirect"
    }, function(accessToken, refreshToken, profile, done) {

            process.nextTick(function () {
                User.findOne({ 'google.id': profile.id }, function (err, user) {
                    if (err){
                        return done(err)
                    }
                    if (user)
                        return done(null,user);
                    else {
                            var newUser= new User();
                            newUser.google.id=profile.id;
                            newUser.google.token=accessToken;
                            newUser.google.name=profile.displayName;

                            newUser.save(function (err) {

                                if (err)
                                    throw err;
                                return done (null, newUser);

                            })
                        console.log(profile);
                    }
            })
        });
    }));



passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "http://localhost:3000/auth/github/redirect"
}, function(accessToken, refreshToken, profile, done) {

    process.nextTick(function () {
        User.findOne({ 'github.id': profile.id }, function (err, user) {
            if (err){
                return done(err)
            }
            if (user)
                return done(null,user);
            else {
                var newUser= new User();
                newUser.github.id=profile.id;
                newUser.github.token=accessToken;
                newUser.github.name=profile.displayName;

                newUser.save(function (err) {

                    if (err)
                        throw err;
                    return done (null, newUser);

                })
                console.log(profile);
            }
        })
    });
}));



passport.use(new FacebookStrategy({
    clientID: keys.facebook.facebook_api_key,
    clientSecret: keys.facebook.facebook_api_secret,
    callbackURL: keys.facebook.callback_url
}, function(accessToken, refreshToken, profile, done) {

    process.nextTick(function () {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
            if (err){
                return done(err)
            }
            if (user)
                return done(null,user);
            else {
                var newUser= new User();
                newUser.facebook.id=profile.id;
                newUser.facebook.token=accessToken;
                newUser.facebook.name=profile.displayName;

                newUser.save(function (err) {

                    if (err)
                        throw err;
                    return done (null, newUser);

                })
                console.log(profile);
            }
        })
    });
}));


