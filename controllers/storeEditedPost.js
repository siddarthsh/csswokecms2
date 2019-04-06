const path = require("path");
const Post = require("../app/models/Post");

module.exports = (req, res) => {
  const post = Post.findById(req.params.id);
  Post.findOneAndUpdate(
    {
      _id: req.body.id // search query
    },
    {
      title: req.body.title,
      category: req.body.category,
      image: req.body.image,
      imageurl: req.body.imageurl,
      content: req.body.content // field:values to update
    },
    {
      new: true, // return updated doc
      runValidators: true // validate before update
    }
  )
    .then(doc => {
      res.redirect("/me/posts");
    })
    .catch(err => {
      console.error(err);
    });
};
