const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const PostSchema = mongoose.Schema({
  title: String,
  category: String,
  content: String,
  image: String,
  author: String,
  username: String,
  slug: { type: String, slug: "title" },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Post", PostSchema);
