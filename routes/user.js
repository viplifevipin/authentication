var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var  {check,validationResult}=require('express-validator');
var passportSetup=require('../config/google')


var dbConnect = require('../dbconfig/db');


router.get('/home',isLoggedIn, function (req,res) {
    dbConnect.get().collection('see').find().toArray(function (err, docs) {
        res.render('user/home', {title: 'nature gallery', product: docs});

    })
});



router.get('/logout',isLoggedIn,function (req,res,next) {
    req.logOut();
    res.redirect('/')
})

router.use('/',notLoggedIn,function (req,res,next) {
    next();
})



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}



module.exports = router;

