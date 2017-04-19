"use strict";

const User = require("../dao/userDAO");

module.exports = class AccountController {
  static getAccountByUser(req, res) {
    //user gets set from jwt parsing ==> has to be protected in route
    let _username = req.user.username;
    User
      .getByUsername(_username)
      .then(user => {
        return res.status(200).json(user.bankAccount);
      })
      .catch((err) => {
        return res.status(404).send("No BankAccount for user: ".concat(_username));
      });
  }
};
