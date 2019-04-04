const path = require("path");
const User = require("../app/models/user");

module.exports = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.redirect("/viewusers");
    }
    res.redirect("/viewusers");
  });
};
