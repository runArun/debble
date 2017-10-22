var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var passport = require('passport');
var session = require('express-session');
// session must put in front of MongoStore.
var MongoStore = require('connect-mongo')(session);

var flash = require('connect-flash');


var index = require('./routes/index');
var usersRoutes = require('./routes/users');
var customerRoutes = require('./routes/customer');


var app = express();

// connect with mongodb
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost:27017/health_assistant', function (err) { if (!err)
    console.log('mongodb connected') });

//
require('./passport_config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    },
}));
app.use(flash());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(validator());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/user', usersRoutes);
app.use('/customer', customerRoutes);

//app.use('/', usersRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
