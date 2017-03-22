"use strict";

var jwt     = require('express-jwt'),
  config = require('../auth/config/config')

const CounterRoutes = require("../api/route/counterRoute");
const CounterRoutes2 = require("../api/route/counterRoute2");

const AuthRoutes = require("../api/route/authRoutes");

const StaticDispatcher = require("../commons/static/index");


var jwtCheck = jwt({
  secret: config.secret
});

module.exports = class Routes {
   static init(app, router) {
     CounterRoutes2.init(router);
     CounterRoutes.init(router);
     AuthRoutes.init(router);

     app.use('/api/protected', jwtCheck);

     router
       .route("*")
       .get(StaticDispatcher.sendIndex);


     app.use("/", router);
   }
}
