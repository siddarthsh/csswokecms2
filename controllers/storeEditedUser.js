const path = require("path");
const User = require("../app/models/user");

module.exports = (req, res, next) => {
  User.findById(req.body.id, function(err, user) {
    // good idea to trim
    var email = req.body.email.trim();
    var username = req.body.username.trim();
    var level = req.body.level.trim();
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    // no need for else since you are returning early ^
    user.local.email = email;
    user.local.username = username;
    user.local.level = level;
    user.name.firstName = firstName;
    user.name.lastName = lastName;
    // don't forget to save!
    user.save(function(err) {
      // todo: don't forget to handle err

      res.redirect("/admin/users");
    });
  });
};
