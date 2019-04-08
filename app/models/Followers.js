const mongoose = require("mongoose");

const FollowersSchema = mongoose.Schema({
  userid: String,
  followers: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Followers", FollowersSchema);
