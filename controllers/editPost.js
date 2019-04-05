const Post = require("../app/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("editPost", {
    user: req.user,
    post
  });
};
