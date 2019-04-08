const User = require("../app/models/User");
const Post = require("../app/models/Post");
const Followers = require("../app/models/Followers");
const FollowingUsers = require("../app/models/FollowingUsers");

module.exports = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return console.log("Error in User.deleteOne Function");
    }
  });
  Post.deleteOne({ authorid: req.params.id }, (error, user) => {
    if (error) {
      return console.log("Error in Post.deleteOne Function");
    }
  });
  Followers.deleteOne({ id: req.params.id }, (error, user) => {
    if (error) {
      return console.log("Error in Followers.deleteOne Function");
    }
  });
  FollowingUsers.deleteOne({ id: req.params.id }, (error, user) => {
    if (error) {
      return console.log("Error in FollowingUsers.deleteOne Function");
    }
  });
  res.redirect("/admin/users");
};
