const validator = require("validator");
const { createUser } = require("../../db/odm");

const getSignup = (req, res) => {
  res.render("signup", { error: undefined, successfulMessage: undefined });
};

const postSignup = (req, res) => {
  const { username, password, email, gender } = req.body;
  const err = createUser({ username, password, email, gender });
  if (err) {
    return res.render("signup", {
      error: err,
      successfulMessage: undefined,
    });
  }
  res.render("signup", {
    error: undefined,
    successfulMessage: "Signed up successfully.",
  });
};

const signupValidation = (req, res, next) => {
  const { username, password, email, gender } = req.body;
  const genderTypes = ["male", "female"];
  if (
    !username ||
    !password ||
    !email ||
    !gender ||
    !genderTypes.includes(gender)
  ) {
    return res.render("signup", {
      error: "You have to fill inputs.",
      successfulMessage: undefined,
    });
  }
  if (!validator.isEmail(email)) {
    return res.render("signup", {
      error: "You have to enter valid email.",
      successfulMessage: undefined,
    });
  }
  if (password.length < 8) {
    return res.render("signup", {
      error: "Password field should be greater than 8 characters.",
      successfulMessage: undefined,
    });
  }
  next();
};

module.exports = {
  getSignup,
  postSignup,
  signupValidation,
};
