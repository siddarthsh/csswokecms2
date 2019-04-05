const Post = require("../app/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.render("post", {
    user: req.user,
    post
  });
};
