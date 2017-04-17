"use strict";

const BankAccount = require("../dao/bankAccountDAO");
const Transaction = require("../dao/transactionDAO");
const User = require("../dao/userDAO");

module.exports = class TestDataController {
  static testData(req, res) {
    console.log("testdata");
    var crypto = require('crypto');
    let user1 = new User();
    let bankAccount1 = new BankAccount();
    bankAccount1.balance = 300;
    let transaction = new Transaction();
    transaction.bankAccountReciever = bankAccount1;
    transaction.type = 'PAY_IN';
    transaction.value = 200;
    bankAccount1.transactions = [transaction];
    user1.username = 'max.mustermann';
    user1.firstName = 'Max';
    user1.lastName = 'Mustermann';
    user1.bankAccount = bankAccount1;
    user1.password = crypto.createHash('sha256').update('password').digest('hex');

    let user2 = new User();
    let bankAccount2 = new BankAccount();
    bankAccount2.balance = 700;
    user2.username = 'gabi.musterfrau';
    user2.firstName = 'Gabi';
    user2.lastName = 'Musterfrau';
    user2.bankAccount = bankAccount2;
    user2.password = crypto.createHash('sha256').update('password').digest('hex');

    let user3 = new User();
    let bankAccount3 = new BankAccount();
    bankAccount3.balance = 1000;
    user3.username = 'erika.test';
    user3.firstName = 'Erika';
    user3.lastName = 'Test';
    user3.bankAccount = bankAccount3;
    user3.password = crypto.createHash('sha256').update('password').digest('hex');

    console.log(User.getByUsername('max.mustermann'));
    User
       .getByUsername('max.mustermann')
       .then(user => {
         User
           .createUser(user1)
           .then(userRes => res.status(200)
             .json(user1))
           .catch(error => res.status(400).json(error));
       });

    User
      .getByUsername('gabi.musterfrau')
      .then(user => {
        User
          .createUser(user2)
          .then(userRes => res.status(200)
            .json(user2))
          .catch(error => res.status(400).json(error));
      });

    User
      .getByUsername('erika.test')
      .then(user => {
        User
          .createUser(user3)
          .then(userRes => res.status(200)
            .json(user3))
          .catch(error => res.status(400).json(error));
      });

    /*
    let bankAccount5 = new BankAccount();
    bankAccount5.balance = 200;
    BankAccount
      .createBankAccount(bankAccount5)
      .then(bankRes => res.status(200)
        .json(bankAccount2))
      .catch(error => res.status(400).json(error));*/

    if(Transaction.findTransactionById(1).length == 0) {
      let transaction1 = new Transaction();
      transaction1.id = 1;
      transaction1.type = "PAY_OUT";
      transaction1.value = 3000;
      Transaction
        .createTransaction(transaction1)
        .then(transRes => res.status(200)
          .json(transaction1))
        .catch(error => res.status(400).json(error));
    }

    res.status(200).json("{'success': 'true'}");


  }
}
