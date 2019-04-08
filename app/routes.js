// app/routes.js

const storePostController = require("../controllers/storePost");
const viewPostsController = require("../controllers/viewPosts");
const viewUsersController = require("../controllers/viewUsers");
const getPostController = require("../controllers/getPost");
const indexController = require("../controllers/index");
const storePost = require("../middleware/storePost");
const deletePostController = require("../controllers/deletePost");
const deleteUserController = require("../controllers/deleteUser");
const editPostController = require("../controllers/editPost");
const editUserController = require("../controllers/editUser");
const storeEditedPostController = require("../controllers/storeEditedPost");
const storeEditedUserController = require("../controllers/storeEditedUser");
const storeEditedProfileController = require("../controllers/storeEditedProfile");
const isAdmin = require("../controllers/isAdmin");
const isMod = require("../controllers/isMod");
const getUserController = require("../controllers/getUser");
const getUserFollowersController = require("../controllers/getUserFollowers");
const getUserFollowingController = require("../controllers/getUserFollowing");
const isProfileOwner = require("../controllers/isProfileOwner");

const followUserController = require("../controllers/followUser");
const unfollowUserController = require("../controllers/unfollowUser");

module.exports = function(app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================

  app.get("/", indexController);

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get("/login", function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render("login", {
      pageid: "login",
      message: req.flash("loginMessage")
    });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get("/signup", function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render("signup", {
      pageid: "signup",
      message: req.flash("signupMessage")
    });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)

  app.get("/me/settings", isLoggedIn, function(req, res) {
    res.render("settings", {
      pageid: "settings",
      user: req.user // get the user out of session and pass to template
    });
  });
  app.get("/me/posts/new", isLoggedIn, function(req, res) {
    res.render("createposts", {
      pageid: "createposts",
      user: req.user // get the user out of session and pass to template
    });
  });
  app.post("/posts/store", isLoggedIn, storePost, storePostController);

  app.use("/posts/store", isLoggedIn, storePost);
  app.get("/delete/:id", isLoggedIn, deletePostController);
  app.get("/edit/post/:id", isLoggedIn, isMod, editPostController);
  app.post("/edit/post/store", isLoggedIn, storeEditedPostController);

  // Based On Browsing
  app.get("/u/:author/p/:slug", getPostController); //Post

  app.get("/u/:username", getUserController);
  app.get("/u/:username/edit", isLoggedIn, function(req, res) {
    res.render("profile-edit", {
      user: req.user // get the user out of session and pass to template
    });
  });
  app.get("/u/:username/followers", getUserFollowersController);
  app.get("/u/:username/following", getUserFollowingController);

  // Shitty thing for following people
  app.post("/follow/store", followUserController);
  // Shitty thing for unfollowing people
  app.post("/unfollow/store", unfollowUserController);

  app.get("/me/posts", isLoggedIn, isMod, viewPostsController);
  app.post("/me/profile/edit/store", isLoggedIn, storeEditedProfileController);

  app.get("/admin/users", isLoggedIn, isAdmin, viewUsersController);
  app.get("/admin/users/delete/:id", isLoggedIn, deleteUserController);
  app.get("/admin/users/edit/:id", isLoggedIn, isAdmin, editUserController);
  app.post("/admin/users/edit/store", isLoggedIn, storeEditedUserController);

  app.get("/forgotpassword", (req, res) => {
    res.render("passwordreset", {
      pageid: "forgotpassword"
    });
  });
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to login
  res.redirect("/login");
}
