"use strict";

var jwt = require('express-jwt'),
  config = require('../auth/config/config');

const AccountRoutes = require("../api/route/accountRoutes");

const AuthRoutes = require("../api/route/authRoutes");
const TestDataRoutes = require("../api/route/testDataRoutes");
const TransactionRoutes = require("../api/route/transactionRoutes");

const StaticDispatcher = require("../commons/static/index");


var jwtCheck = jwt({
  secret: config.secret
});

module.exports = class Routes {
  static init(app, router, io) {
    AuthRoutes.init(router);
    TestDataRoutes.init(router);
    TransactionRoutes.init(router, io);
    AccountRoutes.init(router);
    console.log("init routes");

    app.use('/api/protected', jwtCheck);

    // router
    //   .route("*")
    //   .get(StaticDispatcher.sendIndex);


    app.use("/", router);
  }
};
