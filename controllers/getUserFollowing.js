const User = require("../app/models/user");

module.exports = async (req, res) => {
  const userofprofile = await User.findOne({
    "local.username": req.params.username
  });
  console.log(userofprofile.followingusers);
  res.render("following", {
    user: req.user,
    userofprofile
  });
};
