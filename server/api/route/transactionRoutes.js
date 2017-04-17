/**
 * Created by Michael on 17.04.2017.
 */
"use strict";

const TransactionController = require("../controller/transactionController");


module.exports = class TransactionRoutes {
  static init(router) {

    router
      .route("/api/transactions/:username")
      .get(TransactionController.getTransactions);

  }
}
