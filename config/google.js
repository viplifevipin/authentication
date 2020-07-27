var mongoose=require('mongoose')
var mongodb=require('mongodb')
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./passport-google')
var User=require('../models/User')
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