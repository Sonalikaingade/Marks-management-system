const loginControllers = require("./../controllers/loginControllers");

const express = require("express");

const Router = express.Router();

//Home page routing
Router.route("/").get(loginControllers.protect, loginControllers.getHomePage);
Router.route("/login")
  .get(loginControllers.getLoginPage)
  .post(loginControllers.postLoginData);
Router.route("/register")
  .get(loginControllers.getRegisterPage)
  .post(loginControllers.saveRegisterData);

module.exports = Router;
