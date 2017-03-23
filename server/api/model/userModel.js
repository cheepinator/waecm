"use strict";

const mongoose = require("mongoose");

const userSchema = {
    username: {type: String},
    password: {type: String}
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
