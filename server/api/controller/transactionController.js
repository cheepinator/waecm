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
    let transaction = req.body;
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

  static generateTan(req, res){
    let transaction = req.body;
    let _username = req.user.username;

    //--------- Tan Creation ------
    let tanUser;
    let createdTan = require("crypto").randomBytes(4).toString('hex');

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
      if (receiver === null || tanUser === null) {
        return res.status(403).send("IBAN or Username incorrect!")
      }
      if (receiver.bankAccount.iban === tanUser.bankAccount.iban) {
        return res.status(403).send("Sender and Receiver Account are identical!");
      }
      tanUser.bankAccount.nexttan = createdTan;
      console.log("TAN TO INPUT: " + createdTan);
      tanUser.save();

      // This sends the tan to an SMS
      // As we are just using a testaccount, the meessaging only works with preconfigured numbers
      if (tanUser.phoneNumber !== null && tanUser.phoneNumber !== '') {
        console.log("sending to:"+ tanUser.phoneNumber);
        TransactionController.sendTan(tanUser.phoneNumber, createdTan, transaction.value, receiver.bankAccount.iban);
      }
      return res.status(200).json(transaction);
    })

  }


  static sendTan(number, tan, amount, receiverIBAN){
    var accountSid = 'ACc750b05ce3562596beae513c448f26d3'; // Your Account SID from www.twilio.com/console
    var authToken = 'c66a2acecfdee9ebedc6938b7fc3b9ab';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
      body: 'Your TAN for your transfer of '+ amount +'€ to '+receiverIBAN + ' is: '+tan +'  Thanks for banking with UberBank!',
      to: number,  // Text this number
      from: '+43676800200083' // From a valid Twilio number
    }, function(err, message) {
      console.log(message.sid);
    });
  }

  static executeTransaction(req, res){

    let updatedReceiver;
    let updatedSender;
    let transaction = req.body;
    let _username = req.user.username;

    //---------- Receiver --------
    let senderPromise = User.getByIBAN(transaction.ibanReceiver);

    senderPromise.then(user => {
      updatedReceiver = user;
    })
      .catch((err) => {
        return res.status(404).send("Receiver IBAN not found!");
      });

    //---------Sender------
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
        return res.status(404).send("Wrong IBAN or Username!");
      }
      if(updatedSender.bankAccount.iban === updatedReceiver.bankAccount.iban){
        return res.status(403).send("Sender and Receiver Account are identical!");
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

  static createTransaction(req, res) {

    let transaction = req.body;

    if (transaction.value <= 0) {
      return res.status(400).send("No negative Transactions allowed");
    }
    else if (transaction.tan === null) {
      console.log("Tan null, generating new Tan.")
      TransactionController.generateTan(req, res)
    }
    else{
      console.log("Tan not null, creating Transaction.")
      TransactionController.executeTransaction(req,res)
    }
  }

};
