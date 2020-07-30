var express = require('express');
var router = express.Router();
var dbConnect=require('../dbconfig/db');
var passport=require('passport');
var dbconfig = require('../dbconfig/db');
var passportSetup=require('../config/google')
//var facebookSetup=require('../config/facebook')
let ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
    dbConnect.get().collection('product').find().toArray(function (err, docs) {
        res.render('gallery/index', {title: 'nature gallery', products: docs});

    });

    });

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}))


router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/facebook',
    passport.authenticate('facebook'));


router.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/google' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });



router.get('/auth/github/redirect',
    passport.authenticate('github', { failureRedirect: '/github' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/facebook' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
