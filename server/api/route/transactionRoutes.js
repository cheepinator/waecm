/**
 * Created by Michael on 17.04.2017.
 */
"use strict";

const TransactionController = require("../controller/transactionController");


module.exports = class TransactionRoutes {
  static init(router, io) {
    TransactionController.init(io);
    console.log("init trnas routes");
    router
      .route("/api/protected/transactions")
      .get(TransactionController.getTransactions);

    router
      .route("/api/protected/transactions")
      .post(TransactionController.createTransaction)

    router
      .route("/api/protected/transactions/:id")
      .get(TransactionController.getTransaction);

  }
};
