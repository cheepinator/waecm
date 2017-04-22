"use strict";

const User = require("../dao/userDAO");
const Transaction = require("../dao/transactionDAO");
const BankAccount = require("../dao/bankAccountDAO");

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
    console.log("getTransaction Called")
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

  static createTransaction(req, res){
    console.log("createTransaction called");

    //TODO validation (keine negative transaktion etc. ^^)

    let _username = req.user.username;
    let transaction = req.body;
    let updatedReceiver;
    let updatedSender;

    console.log("Transaction to: "+transaction.ibanReceiver);
    //TODO fehlermeldungen am client


    //---------- Receiver --------
    let senderPromise = User.getByIBAN(transaction.ibanReceiver);

      senderPromise.then(user => {
      updatedReceiver = user;
    })
      .catch((err) => {
        console.log("Receiver IBAN not found "+err);
      });

    //---------Sender------
    console.log("Searching for User: "+_username);
    let receiverPromise = User.getByUsername(_username);

    receiverPromise
      .then(user => {
        updatedSender=user;
      })
      .catch((err) => {
        console.log("Sender Username not found: "+err);
      });


    //--- Transaction and Update
    Promise.all([senderPromise,receiverPromise]).then(function () {
      transaction.date = new Date();
      transaction.ibanSender = updatedSender.bankAccount.iban;

      updatedReceiver.bankAccount.balance+=transaction.value;
      updatedSender.bankAccount.balance-=transaction.value;


      updatedReceiver.bankAccount.transactions.push(transaction);
      let transactionsender = transaction;
      transactionsender.value = -transactionsender.value;
      updatedSender.bankAccount.transactions.push(transactionsender);

      updatedReceiver.save();
      updatedSender.save();
      // User.save(updatedReceiver);
      // User.save(updatedSender);
    });

//TODO erfolg zurückgeben
  }

};
