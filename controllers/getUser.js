const User = require("../app/models/user");
const Post = require("../app/models/Post");
module.exports = async (req, res) => {
  const userofprofile = await User.findOne({
    "local.username": req.params.username
  });
  const posts = await Post.find({
    author: req.params.username
  });

  res.render("profile", {
    user: req.user,
    posts,
    userofprofile
  });
};
