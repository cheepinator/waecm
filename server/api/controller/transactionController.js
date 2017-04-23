"use strict";

const User = require("../dao/userDAO");
const Transaction = require("../dao/transactionDAO");

var io = null;

module.exports = class TransactionController {

  static init(iooo) {
    io = iooo;
  }

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
    //todo transaction auf den empfangenden user emitten mit der transaction, dann im account controller im client anpassen
    io().emit(_username, {data: 'test'});
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
