// server.js

// set up ======================================================================
// get all the tools we need
var express = require("express");
const expressEdge = require("express-edge");
const edge = require("edge.js");
var app = express();
var port = process.env.PORT || 4000;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var configDB = require("./config/database.js");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// configuration ===============================================================
mongoose
  .connect(configDB.url, { useNewUrlParser: true })
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));
// connect to our database

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(express.logger("dev")); // log every request to the console
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", __dirname + "/views"); // set up ejs for templating
app.use(fileUpload());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// required for passport
app.use(express.session({ secret: "ilovescotchscotchyscotchscotch" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

app.listen(port, () => {
  console.log("App is running on port " + port);
});
