"use strict";

const mongoose = require("mongoose");

const transactionSchema = {
  id: {type: Number},
  type: {type: String},
  value: {type: Number},
  time: {type: Date},
  bankAccountSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bankAccountSchema'
  },
  bankAccountReciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bankAccountSchema'
  }
}

module.exports = mongoose.Schema(transactionSchema);
