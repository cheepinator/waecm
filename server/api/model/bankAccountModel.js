"use strict";

const mongoose = require("mongoose");
const transactionSchema = require("../model/transactionModel");

const bankAccountSchema = {
  balance: {type: Number},
  iban: {type: String},
  transactions: {type: [transactionSchema]}
};

module.exports = mongoose.Schema(bankAccountSchema);

