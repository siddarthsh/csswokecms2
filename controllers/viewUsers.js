const User = require("../app/models/user");

module.exports = async (req, res) => {
  const users = await User.find({});

  res.render("viewusers", {
    users
  });
};
