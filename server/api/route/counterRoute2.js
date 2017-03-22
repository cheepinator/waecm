"use strict";

const CounterController = require("../controller/counterController");
const AuthController = require("../controller/authController");

module.exports = class CounterRoutes2 {
    static init(router) {



      router
        .route("/api/counter")
        .get(CounterController.getCounter)
        .post(CounterController.incrementCounter);
        //.post(AuthController.createToken)
    }
}

