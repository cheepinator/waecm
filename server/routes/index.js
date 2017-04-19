"use strict";

var jwt = require('express-jwt'),
  config = require('../auth/config/config');

const CounterRoutes = require("../api/route/counterRoute");
const AccountRoutes = require("../api/route/accountRoutes");
const CounterRoutes2 = require("../api/route/counterRoute2");

const AuthRoutes = require("../api/route/authRoutes");
const TestDataRoutes = require("../api/route/testDataRoutes");
const TransactionRoutes = require("../api/route/transactionRoutes");

const StaticDispatcher = require("../commons/static/index");


var jwtCheck = jwt({
  secret: config.secret
});

module.exports = class Routes {
  static init(app, router) {
    //CounterRoutes2.init(router);
    CounterRoutes.init(router);
    AuthRoutes.init(router);
    TestDataRoutes.init(router);
    TransactionRoutes.init(router);
    AccountRoutes.init(router);

    app.use('/api/protected', jwtCheck);

    router
      .route("*")
      .get(StaticDispatcher.sendIndex);


    app.use("/", router);
  }
};
