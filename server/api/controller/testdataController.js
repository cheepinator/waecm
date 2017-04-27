"use strict";

const User = require("../dao/userDAO");

module.exports = class TestDataController {
  static testData(req, res) {

    this.generateTestData();
    return res.status(200).json("{'success': 'true'}");

  };

  static generateTestData() {
    return new Promise((resolve, reject) => {
      console.log("testdata");
      var crypto = require('crypto');
      let user1 = new User();
      let bankAccount1 = new BankAccount();
      bankAccount1.balance = 300;
      bankAccount1.iban = "AT55 7989 9877 9879"
      let transaction = new Transaction();
      transaction.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction.value = 700;
      transaction.ibanSender = "AT55 7989 9877 9879";
      transaction.ibanReceiver = "AT55 2189 1241 0275";
      transaction.paymentReference = "Ich need money.";
      transaction.category = "House";
      let transaction2 = new Transaction();
      transaction2.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction2.value = 1000;
      transaction2.ibanSender = "AT55 7989 9877 9879";
      transaction2.ibanReceiver = "AT55 2189 1241 0275";
      transaction2.paymentReference = "Ich need more money.";
      transaction2.category = "Car";
      let transaction9 = new Transaction();
      transaction9.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction9.value = 1000;
      transaction9.ibanSender = "AT55 7989 9877 9879";
      transaction9.ibanReceiver = "AT55 2189 1241 1111";
      transaction9.paymentReference = "I worked for you.";
      transaction9.category = "Work";
      bankAccount1.transactions = [transaction, transaction2, transaction9];
      user1.username = 'max.mustermann';
      user1.firstName = 'Max';
      user1.lastName = 'Mustermann';
      user1.bankAccount = bankAccount1;
      user1.password = crypto.createHash('sha256').update('password').digest('hex');

      let user2 = new User();
      let bankAccount2 = new BankAccount();
      bankAccount2.balance = 700;
      bankAccount2.iban = "AT55 2189 1241 0275"
      user2.username = 'gabi.musterfrau';
      user2.firstName = 'Gabi';
      user2.lastName = 'Musterfrau';
      user2.bankAccount = bankAccount2;
      let transaction3 = new Transaction();
      transaction3.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction3.ibanSender = "AT55 7989 9877 9879";
      transaction3.ibanReceiver = "AT55 2189 1241 0275";
      transaction3.paymentReference = "Ich need money.";
      transaction3.category = "House";
      let transaction4 = new Transaction();
      transaction4.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction4.value = 1000;
      transaction4.ibanSender = "AT55 7989 9877 9879";
      transaction4.ibanReceiver = "AT55 2189 1241 0275";
      transaction4.paymentReference = "Ich need more money.";
      transaction4.category = "Car";
      let transaction5 = new Transaction();
      transaction5.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction5.value = 1000;
      transaction5.ibanSender = "AT55 2189 1241 0275";
      transaction5.ibanReceiver = "AT55 2189 1241 1111";
      transaction5.paymentReference = "Fun.";
      transaction5.category = "Fun";
      bankAccount2.transactions = [transaction3, transaction4, transaction5];
      user2.password = crypto.createHash('sha256').update('password').digest('hex');

      let user3 = new User();
      let bankAccount3 = new BankAccount();
      bankAccount3.balance = 1000;
      bankAccount3.iban = "AT55 2189 1241 1111"
      user3.username = 'erika.test';
      user3.firstName = 'Erika';
      user3.lastName = 'Test';
      user3.bankAccount = bankAccount3;
      let transaction8 = new Transaction();
      transaction8.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction8.value = 1000;
      transaction8.ibanSender = "AT55 2189 1241 1111";
      transaction8.ibanReceiver = "AT55 2189 1241 0275";
      transaction8.paymentReference = "Fun.";
      transaction8.category = "Fun";

      let transaction10 = new Transaction();
      transaction10.date = new Date(2017, 4, 20, 10, 10, 10, 0);
      transaction10.value = 1000;
      transaction10.ibanSender = "AT55 2189 1241 1111";
      transaction10.ibanReceiver = "AT55 7989 9877 9879";
      transaction10.paymentReference = "I worked for you.";
      transaction10.category = "Work";
      bankAccount3.transactions = [transaction8, transaction10];
      user3.password = crypto.createHash('sha256').update('password').digest('hex');

      console.log(User.getByUsername('max.mustermann'));
      let promise1 = User
        .getByUsername('max.mustermann');
      promise1
        .then(user => {
          User
            .createUser(user1)
            .then(userRes => console.log("sucessfully created user"))
            .catch(error => console.log(error));
        });

      let promise2 = User
        .getByUsername('gabi.musterfrau');
      promise2
        .then(user => {
          User
            .createUser(user2)
            .then(userRes => console.log("sucessfully created user"))
            .catch(error => console.log(error));
        });

      let promise3 = User
        .getByUsername('erika.test');
      promise3
        .then(user => {
          User
            .createUser(user3)
            .then(userRes => console.log("sucessfully created user"))
            .catch(error => console.log(error));
        });

      /*
       let bankAccount5 = new BankAccount();
       bankAccount5.balance = 200;
       BankAccount
       .createBankAccount(bankAccount5)
       .then(bankRes => res.status(200)
       .json(bankAccount2))
       .catch(error => res.status(400).json(error));*/

      Promise.all([promise1,promise2,promise3]).then(function () {
        console.log("every promise ready.");
        resolve();
      });



    });


  };
}
