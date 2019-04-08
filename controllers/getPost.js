const Post = require("../app/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  res.render("post", {
    user: req.user,
    post
  });
};
