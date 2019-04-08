const Post = require("../app/models/Post");
const User = require("../app/models/User");

module.exports = async (req, res) => {
  Post.create(req.body, (error, post) => {
    if (error) {
      return res.redirect("/posts/new");
    }
  });
  const post = await Post.findOne({ title: req.body.title }, { _id: 1 });
  console.log(post);

  await User.findOneAndUpdate(
    { _id: req.body.author },
    { $addToSet: { listofposts: post.id } },
    { safe: true, upsert: true },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/me/posts");
      }
    }
  );
};
