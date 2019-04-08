const path = require("path");
const User = require("../app/models/User");

module.exports = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.redirect("/admin/users");
    }
    res.redirect("/admin/users");
  });
};
