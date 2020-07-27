var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs=require('express-handlebars');
const db=require('./dbconfig/db')

var mongodb=require('mongodb');
var  {check,validationResult}=require('express-validator')
var session = require('express-session');
var passport = require('passport');
const flash = require('connect-flash');




var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');







var app = express();


// view engine setup

app.engine('.hbs', expressHbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname,'views'))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret:'mysecret',
  resave:false,
  saveUninitialized:false,
  cookie: { maxAge: 180 * 60 * 1000 }
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) {

  res.locals.login=req.isAuthenticated();
  next();

})

app.use(function(req, res,next){
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.connect(function (error) {

  if (error){
    console.log('Unable to connect database');
    process.exit(1);
  } else {
    console.log('Shopping cart Database connecetd successfully...');
  }

});
module.exports = app;
