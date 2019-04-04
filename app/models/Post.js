const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  category: String,
  content: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Post", PostSchema);
