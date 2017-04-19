"use strict";

const AuthController = require("../controller/authController");


module.exports = class AuthRoutes {
  static init(router) {

    router
      .route("/api/users")
      .post(AuthController.createUser);

    router.route("/api/token")
      .post(AuthController.createToken);
  }
};
