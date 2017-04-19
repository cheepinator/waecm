"use strict";

const User = require("../dao/userDAO");
const Transaction = require("../dao/transactionDAO");

module.exports = class TransactionController {
  static getTransactions(req, res) {
    //user gets set from jwt parsing ==> has to be protected in route
    let _username = req.user.username;


    User
      .getByUsername(_username)
      .then(user => {
        return res.status(200).json(user.bankAccount.transactions);
      })
      .catch((err) => {
        return res.status(404).send("No BankAccount for user: ".concat(_username));
      });
  }

  static getTransaction(req, res) {
    //user gets set from jwt parsing ==> has to be protected in route
    let _id = req.params.id;

    Transaction.findTransactionById(_id)
      .then(transaction => {
        res.status(200).json(transaction);
      })
      .catch((err) => {
        return res.status(404).send("No Transaction found with id: ".concat(_id));
      });


  }
};
