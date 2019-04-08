const path = require("path");
const User = require("../app/models/User");

module.exports = (req, res, next) => {
  User.findById(req.body.id, function(err, user) {
    // good idea to trim

    var name = req.body.name.trim();
    var description = req.body.description.trim();
    // no need for else since you are returning early ^

    user.name = name;
    user.description = description;

    // don't forget to save!
    user.save(function(err) {
      // todo: don't forget to handle err

      res.redirect("/u/" + user.username);
    });
  });
};
