const mongoose = require("mongoose");

const FollowingUsersSchema = mongoose.Schema({
  userid: String,
  followingusers: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("FollowingUsers", FollowingUsersSchema);
