const User = require("../app/models/User");
const Post = require("../app/models/Post");
const Followers = require("../app/models/Followers");
const FollowingUsers = require("../app/models/FollowingUsers");

module.exports = async (req, res) => {
  const userofprofile = await User.findOne({
    username: req.params.username
  });
  const followers = await Followers.findOne({
    userid: userofprofile._id
  });
  const followingusers = await FollowingUsers.findOne({
    userid: userofprofile._id
  });

  const posts = await Post.find({
    author: userofprofile._id
  });

  res.render("profile", {
    user: req.user,
    posts,
    followers,
    followingusers,
    userofprofile
  });
};
