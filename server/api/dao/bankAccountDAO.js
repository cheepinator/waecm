"use strict";

let mongoose = require("mongoose");
const Promise = require("bluebird");
const bankAccountSchema = require("../model/bankAccountModel");
const _ = require("lodash");


bankAccountSchema.statics.createBankAccount = (bankAccount) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(bankAccount)) {
      return reject(new TypeError("BankAccount is not a valid object."));
    }
    let _bankAccount = new BankAccount(bankAccount);

    _bankAccount.save((err, saved) => {
      err ? reject(err) : resolve(saved);
    });
  });
};


bankAccountSchema.statics.getByIBAN = (iban) => {
  return new Promise((resolve, reject) => {
    if (!iban) {
      return reject(new TypeError("IBAN is not defined."));
    }

    let _query = {iban:iban}

    BankAccount.findOne(_query)
      .exec((err, bankAccount) => {
        err ? reject(err)
          : resolve(bankAccount);
      });
  });
}


const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
