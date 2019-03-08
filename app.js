var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var appConfigs = require("./configs/app.config.json");

var indexRouter = require('./routes/index');

var configsRouter = require('./routes/configs'); 
var authsAdminsRouter = require('./routes/auths/admins'); 

var openRouter = require('./routes/v1/open');
var secureRouter = require('./routes/v1/secure');
var superRouter = require('./routes/v1/super'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`/`, indexRouter);

app.use(`/configs`, configsRouter);
app.use(`/auths/admins`, authsAdminsRouter);

app.use(`/${appConfigs.apiVersion}/open`, openRouter);
app.use(`/${appConfigs.apiVersion}/secure`, secureRouter);
app.use(`/${appConfigs.apiVersion}/super`, superRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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