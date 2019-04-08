const User = require("../app/models/User");

module.exports = async (req, res) => {
  const edituser = await User.findById(req.params.id);
  res.render("editUser", {
    user: req.user,
    edituser
  });
};
