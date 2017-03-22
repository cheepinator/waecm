"use strict";

const AuthController = require("../controller/authController");


module.exports = class AuthRoutes {
  static init(router) {

    console.log("1");
    router
      .route("/users")
      .post(AuthController.createUser);

    router.route("/sessions/create")
      .post(AuthController.createToken);
  }
}
