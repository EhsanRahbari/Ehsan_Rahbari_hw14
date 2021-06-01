const express = require("express");
const router = express.Router();
const {
  getSignup,
  postSignup,
  signupValidation,
} = require("./services/signup");
const {
  getLogin,
  postLogin,
  loginValidation,
  authorization,
} = require("./services/login");
const { getDashboard } = require("./services/dashboard");

router.get("/signup", getSignup);
router.post("/signup", signupValidation, postSignup);
router.get("/login", getLogin);
router.post("/login", loginValidation, authorization, postLogin);
router.get("/dashboard", getDashboard);

module.exports = router;
