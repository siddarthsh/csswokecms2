const User = require("../app/models/User");

module.exports = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $pull: { followingusers: req.body.followingusers } },
    { safe: true, upsert: true },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
  User.findByIdAndUpdate(
    req.body.followedid,
    { $pull: { followers: req.body.username } },
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
