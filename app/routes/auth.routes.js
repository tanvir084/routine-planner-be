const express = require('express');
const authRouter = express.Router();

const {
  signUpController,
  signInController,
} = require("../controller");

authRouter.post("/api/auth/signup/user", signUpController);

authRouter.post("/api/auth/signin/user", signInController);

module.exports = {
  authRouter,
};
