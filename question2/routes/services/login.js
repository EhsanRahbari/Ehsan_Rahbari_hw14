const { findUser, makeTrueIsLoggedIn } = require("../../db/odm");

const getLogin = (req, res) => {
  res.render("login", {
    error: undefined,
    successfulMessage: undefined,
  });
};

const postLogin = (req, res) => {
  res.redirect(`/dashboard?username=${req.locals.user.username}`);
};

const authorization = (req, res, next) => {
  const { username, password } = req.body;
  user = findUser(username, password);
  if (!user) {
    return res.render("login", {
      error: "User with this information does'nt exist.",
      successfulMessage: undefined,
    });
  }
  const err = makeTrueIsLoggedIn(user.username);
  if (err) {
    return res.render("login", {
      error: "Internal server error.",
      successfulMessage: undefined,
    });
  }
  req.locals = {
    user,
  };
  next();
};

const loginValidation = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render("login", {
      error: "You have to fill inputs.",
      successfulMessage: undefined,
    });
  }
  if (password.length < 8) {
    return res.render("login", {
      error: "Password field should be greater than 8 characters.",
      successfulMessage: undefined,
    });
  }
  next();
};

module.exports = {
  getLogin,
  postLogin,
  loginValidation,
  authorization,
};
