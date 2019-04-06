const User = require("../app/models/user");

module.exports = async (req, res) => {
  const userofprofile = await User.findOne({
    "local.username": req.params.username
  });

  res.render("followers", {
    user: req.user,
    userofprofile
  });
};
