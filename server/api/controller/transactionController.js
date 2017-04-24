"use strict";

const User = require("../dao/userDAO");
const Transaction = require("../dao/transactionDAO");
const BankAccount = require("../dao/bankAccountDAO");

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

  static createTransaction(req, res) {
    console.log("createTransaction called");

    //TODO validation (keine negative transaktion etc. ^^)

    let transaction = req.body;
    let _username = req.user.username;

    //--------- Tan Creation ------
    if (transaction.tan === null) {
      console.log("sent Tan is null, creating Tan");
      let tanUser;
      let createdTan = require("crypto").randomBytes(4).toString('hex');

      console.log("Searching for User: " + _username);
      let senderPromise = User.getByUsername(_username);

      senderPromise
        .then(user => {
          tanUser = user;
        })
        .catch((err) => {
          return res.status(404).send("Sender Username not found!");
        });

      let receiverPromise = User.getByIBAN(transaction.ibanReceiver);
      let receiver;

      receiverPromise.then(user => {
        receiver = user;
      })
        .catch((err) => {
          return res.status(404).send("Receiver IBAN not found!");
        });


      Promise.all([senderPromise,receiverPromise]).then(function () {
        if(receiver===null || tanUser === null){
          return res.status(403).send("IBAN or Username incorrect!")
        }
        console.log("receiver: "+tanUser.username)
        tanUser.bankAccount.nexttan = createdTan;
        console.log("TAN TO INPUT: " + createdTan);
        tanUser.save();
        console.log("saved tan");
        return res.status(200).json(transaction);
      })

    }


    if (transaction.tan !== null) {
      console.log("sent Tan is not null");


      let updatedReceiver;
      let updatedSender;

      if (transaction.value <= 0) {
        return res.status(400).send("No negative Transactions allowed");
      }

      console.log("Transaction to: " + transaction.ibanReceiver);


      //---------- Receiver --------
      let senderPromise = User.getByIBAN(transaction.ibanReceiver);

      senderPromise.then(user => {
        updatedReceiver = user;
      })
        .catch((err) => {
          return res.status(404).send("Receiver IBAN not found!");
        });

      //---------Sender------
      console.log("Searching for User: " + _username);
      let receiverPromise = User.getByUsername(_username);

      receiverPromise
        .then(user => {
          updatedSender = user;
        })
        .catch((err) => {
          return res.status(404).send("Sender Username not found!");
        });


      //--- Transaction and Update
      Promise.all([senderPromise, receiverPromise]).then(function () {

        if(updatedSender === null || updatedReceiver === null)
        {
          console.log("error user NULL");
          return res.status(404).send("Wrong IBAN or Username!");
        }
        //---- check tan ------
        if (updatedSender.bankAccount.nexttan === transaction.tan) {

          transaction.date = new Date();
          transaction.ibanSender = updatedSender.bankAccount.iban;

          updatedReceiver.bankAccount.balance = parseInt(updatedReceiver.bankAccount.balance) + parseInt(transaction.value);
          updatedSender.bankAccount.balance = parseInt(updatedSender.bankAccount.balance) - parseInt(transaction.value);


          updatedReceiver.bankAccount.transactions.push(transaction);
          let transactionsender = transaction;
          transactionsender.value = -transactionsender.value;
          updatedSender.bankAccount.transactions.push(transactionsender);

          //invalidate used Tan
          updatedSender.bankAccount.nexttan = null;

          updatedReceiver.save();
          updatedSender.save();
          //todo transaction auf den empfangenden user emitten mit der transaction, dann im account controller im client anpassen
          io().emit(updatedReceiver.username, transaction);
          return res.status(200).json(transaction);
        }

        else {
          console.log("tan not matching: saved:" + updatedSender.bankAccount.nexttan + "!= provided:" + transaction.tan);
          return res.status(403).send("Wrong TAN!");
        }


      });


    }

  }

};
