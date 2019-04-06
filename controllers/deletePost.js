const path = require("path");
const Post = require("../app/models/Post");

module.exports = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.redirect("/me/posts");
    }
    res.redirect("/me/posts");
  });
};
