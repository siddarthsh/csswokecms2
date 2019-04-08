const path = require("path");
const Post = require("../app/models/Post");
const User = require("../app/models/User");
module.exports = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.redirect("/me/posts");
    }
  });
  console.log(req.params);
  User.findOneAndUpdate(
    {},
    { $pull: { listofposts: req.params.id } },
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
