const { findUserForDashboard } = require("../../db/odm");

const getDashboard = (req, res) => {
  const user = findUserForDashboard(req.query.username);
  if (!user.isLoggedIn) {
    return res.redirect("/login");
  }
  res.render("dashboard", {
    user,
  });
};

module.exports = {
  getDashboard,
};
