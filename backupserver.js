// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
const expressEdge = require('express-edge');
var app      = express();
var port     = process.env.PORT || 4000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var morgan = require('morgan');
var session = require('express-session')

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))
 // connect to our database

require('./config/passport')(passport); // pass passport for configuration


	// set up our express application
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); // get information from html forms
	app.use(express.static('public'));
	app.use(expressEdge);
	app.set('views',__dirname+'/views'); // set up ejs for templating
  app.use(session({
      secret: 'ilovescotchscotchyscotchscotch',
      resave: true,
      saveUninitialized: true
  }));
	// required for passport
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
