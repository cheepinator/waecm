"use strict";

const TodoRoutes = require("../api/todo/route/todo-route");
const CounterRoutes = require("../api/route/counterRoute");

const StaticDispatcher = require("../commons/static/index");


module.exports = class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     CounterRoutes.init(router);

     router
       .route("*")
       .get(StaticDispatcher.sendIndex);


     app.use("/", router);
   }
}
