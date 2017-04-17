"use strict";

const TestDataController = require("../controller/testdataController");


module.exports = class TestDataRoutes {
  static init(router) {

    router
      .route("/api/testData")
      .post(TestDataController.testData);

  }
}
