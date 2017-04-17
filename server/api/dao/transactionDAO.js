/**
 * Created by Michael on 17.04.2017.
 */
/**
 * Created by Michael on 17.04.2017.
 */
"use strict";

let mongoose = require("mongoose");
const Promise = require("bluebird");
const transactionSchema = require("../model/transactionModel");
const _ = require("lodash");


transactionSchema.statics.findTransactionById = (id) => {
  return new Promise((resolve, reject) => {
    Transaction.findOne({'id': id})
      .exec((err, trans) => {
        if(err)
        {
          console.log("error");
          reject(err);
        }
        else
        {
          resolve(trans);
        }
      });
  });
}

transactionSchema.statics.findTransactionByBankAccount = (bankAccount) => {
  return new Promise((resolve, reject) => {
    Transaction.findOne({'bankAccountReciever': bankAccount})
      .exec((err, trans) => {
        if(err)
        {
          console.log("error");
          reject(err);
        }
        else
        {
          resolve(trans);
        }
      });
  });
}

transactionSchema.statics.createTransaction = (transaction) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(transaction)) {
      return reject(new TypeError("Transaction is not a valid object."));
    }
    let _transaction = new Transaction(transaction);

    _transaction.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

const Transaction  = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
