"use strict";

const AccountController = require("../controller/accountController");


module.exports = class AccountRoutes {
  static init(router) {

    router
      .route("/api/protected/account")
      .get(AccountController.getAccountByUser);

  }
};
