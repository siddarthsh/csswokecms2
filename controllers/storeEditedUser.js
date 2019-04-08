const path = require("path");
const User = require("../app/models/User");

module.exports = (req, res, next) => {
  User.findById(req.body.id, function(err, user) {
    // good idea to trim
    var email = req.body.email.trim();
    var username = req.body.username.trim();
    var level = req.body.level.trim();
    var name = req.body.name.trim();

    // no need for else since you are returning early ^
    user.email = email;
    user.username = username;
    user.level = level;
    user.name = name;

    // don't forget to save!
    user.save(function(err) {
      // todo: don't forget to handle err

      res.redirect("/admin/users");
    });
  });
};
