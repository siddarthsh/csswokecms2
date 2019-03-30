// app/routes.js

const storePostController = require('../controllers/storePost');
const viewPostsController = require('../controllers/viewPosts');
const getPostController = require('../controllers/getPost');
const indexController = require('../controllers/index');
const storePost = require('../middleware/storePost');
const deletePostController = require('../controllers/deletePost');
const editPostController = require('../controllers/editPost');
const storeEditedPostController = require('../controllers/storeEditedPost');

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================

	app.get("/", indexController);

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		});
	});
	app.get('/posts/new', isLoggedIn, function(req, res) {
		res.render('create', {
			user : req.user // get the user out of session and pass to template
		});
	});
	app.post("/posts/store", isLoggedIn, storePost, storePostController);
	app.get("/viewposts", isLoggedIn, viewPostsController);
	app.use('/posts/store', isLoggedIn, storePost);
	app.get("/post/:id", getPostController);
	app.get("/delete/:id", isLoggedIn, deletePostController);
	app.get("/edit/:id", isLoggedIn, editPostController);
	app.post("/edit/store", isLoggedIn, storeEditedPostController);

	app.get('/passwordreset', (req, res) => {
	    res.render('passwordreset');
	});
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to login
	res.redirect('/login');
}
