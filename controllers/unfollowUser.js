const Followers = require("../app/models/Followers");
const FollowingUsers = require("../app/models/FollowingUsers");

module.exports = (req, res, next) => {
  FollowingUsers.findOneAndUpdate(
    { userid: req.body.id },
    { $pull: { followingusers: req.body.followedid } },
    { safe: true, upsert: true },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
  Followers.findOneAndUpdate(
    { userid: req.body.followedid },
    { $pull: { followers: req.body.id } },
    { safe: true, upsert: true },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/u/" + req.body.followingusers);
      }
    }
  );
};
