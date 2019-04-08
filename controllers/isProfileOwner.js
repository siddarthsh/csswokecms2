const User = require("../app/models/User");

module.exports = (req, res, next) => {
  const username = req.path.split("/");

  if (req.params.username == username[2]) {
    return next();
  }

  res.redirect("/");
};
