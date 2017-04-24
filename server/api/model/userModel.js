"use strict";

const mongoose = require("mongoose");
const bankAccountSchema = require("../model/bankAccountModel");

const userSchema = {
    username: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    phoneNumber: {type: String},
    bankAccount: {
      type: bankAccountSchema,
      ref: 'bankAccountSchema'
    }


}
/*
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};
*/
module.exports = mongoose.Schema(userSchema);
