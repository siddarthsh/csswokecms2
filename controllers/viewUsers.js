const User = require("../app/models/User");

module.exports = async (req, res) => {
  const users = await User.find({});

  res.render("viewusers", {
    user: req.user,
    pageid: "viewusers",
    users
  });
};
