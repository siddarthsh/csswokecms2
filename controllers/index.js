const Post = require("../app/models/Post");

module.exports = async (req, res) => {
  const posts = await Post.find({});

  res.render("index", {
    user: req.user,
    posts
  });
};
