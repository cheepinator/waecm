"use strict";

let mongoose = require("mongoose");
const Promise = require("bluebird");
const userSchema = require("../model/userModel");
const _ = require("lodash");

userSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    User.find(_query)
      .exec((err, users) => {
        err ? reject(err)
          : resolve(users);
      });
  });
}

userSchema.statics.getAllUsers = () => {
  return new Promise((resolve, reject) => {

    let _query = {}

    User.find(_query)
      .exec((err, user) => {
        err ? reject(err)
          : resolve(user);
      });
  });
}

userSchema.statics.getByUsername = (_username) => {
  return new Promise((resolve, reject) => {
    if (!_username) {
      return reject(new TypeError("Username is not defined."));
    }

    let _query = {username: _username}

    User.findOne(_query)
      .exec((err, user) => {
        err ? reject(err)
          : resolve(user);
      });
  });
}


userSchema.statics.getByIBAN = (_iban) => {
  return new Promise((resolve, reject) => {
    if (!_iban) {
      return reject(new TypeError("IBAN is not defined."));
    }

    let _query = {'bankAccount.iban': _iban}

    User.findOne(_query)
      .exec((err, user) => {
        err ? reject(err)
          : resolve(user);
      });
  });
}


userSchema.statics.createUser = (user) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(user)) {
      return reject(new TypeError("User is not a valid object."));
    }

    let _user = new User(user);

    _user.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
