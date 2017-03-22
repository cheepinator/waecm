"use strict";

const CounterController = require("../controller/counterController");

module.exports = class CounterRoutes {
    static init(router) {
      router
        .route("/api/counter")
        .get(CounterController.getCounter)
        .post(CounterController.incrementCounter);
    }
}
