const express = require("express");
const {
  signup,
  login,
  logout,
  verifyOtp,
} = require("../controllers/user.controller");

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/verify-otp", verifyOtp);
route.post("/logout", logout);

module.exports = { route };
