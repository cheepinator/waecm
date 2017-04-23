"use strict";

const AuthController = require("../controller/authController");


module.exports = class AuthRoutes {
  static init(router) {

    console.log("init auth routes");
    router
      .route("/api/users")
      .post(AuthController.createUser);

    router.route("/api/token")
      .post(AuthController.createToken);
  }
};
