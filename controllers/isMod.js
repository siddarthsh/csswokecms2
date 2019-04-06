const User = require("../app/models/user");

module.exports = (req, res, next) => {
  if (req.user.local.level == "Moderator" || "Admin") {
    return next();
  }

  res.redirect("/");
};
