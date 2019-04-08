const User = require("../app/models/User");

module.exports = (req, res, next) => {
  if (req.user.level == "Moderator" || req.user.level == "Admin") {
    return next();
  }

  res.redirect("/");
};
