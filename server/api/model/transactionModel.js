"use strict";

const mongoose = require("mongoose");

const transactionSchema = {
  id: {type: Number},
  //type: {type: String},
  value: {type: Number},
  date: {type: Date},
  ibanSender: {type: String},
  ibanReceiver: {type: String}

  // bankAccountSender: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'bankAccountSchema'
  // },
  // bankAccountReciever: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'bankAccountSchema'
  // }
}

module.exports = mongoose.Schema(transactionSchema);
