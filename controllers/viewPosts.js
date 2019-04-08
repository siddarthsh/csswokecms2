const Post = require("../app/models/Post");
const User = require("../app/models/User");

module.exports = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.level == "Admin") {
    const posts = await Post.find({});
    res.render("viewposts", {
      user: req.user,
      posts
    });
  } else {
    const posts = await Post.find({ authorid: req.user._id });

    res.render("viewposts", {
      pageid: "viewposts",
      user: req.user,
      posts
    });
  }
};
