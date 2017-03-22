"use strict";

const CounterController = require("../controller/counterController");

module.exports = class CounterRoutes {
    static init(router) {
      router
        .route("/counter")
        .get(CounterController.getCounter())
        .post(CounterController.incrementCounter());
    }
}
