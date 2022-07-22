var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/database');
var passport = require('passport');
var accountRoute = require('./routes/account');
var userRoute = require('./routes/user');
var packRoute = require('./routes/pack');
var companyRoute = require('./routes/company')
var tagRoute = require('./routes/tag');
var socialAccountRoute = require('./routes/socialAccount');
var statsRoute = require('./routes/stats');
var benchmarkRoute = require('./routes/benchmark');
var fileRoute = require('./routes/file');
var eventRoute = require('./routes/event');
var bugRoute = require('./routes/bug');
var notificationRoute = require('./routes/notification');
var layoutRoute = require('./routes/layout');
var dataMigrationRoute = require('./routes/dataMigrater');
var app = express();
const http = require('http').Server(app);


console.log('in app.js')

/* Routers Imports */


/*--------------------*/

/* CORS Setup*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Methods', '*');
  
  next();
});

//Mongoose Connect
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(passport.initialize());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res, next) {
  res.send(true).status(200);
});






/* Global routers */
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/api/account', accountRoute);
app.use('/api/user', userRoute);
app.use('/api/pack', packRoute);
app.use('/api/company', companyRoute);
app.use('/api/tag', tagRoute);
app.use('/api/socialAccount', socialAccountRoute);
app.use('/api/stats', statsRoute);
app.use('/api/benchmark', benchmarkRoute);
app.use('/api/file', fileRoute);
app.use('/api/bug', bugRoute);
app.use('/api/event', eventRoute);
app.use('/api/notification', notificationRoute);
app.use('/api/layout', layoutRoute);
app.use('/api/data', dataMigrationRoute);


/*--------------------*/


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
  // res.render('error');
});

module.exports = app;
