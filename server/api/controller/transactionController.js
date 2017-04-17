/**
 * Created by Michael on 17.04.2017.
 */
"use strict";

const User = require("../dao/userDAO");

module.exports = class TransactionController {
  static getTransactions(req, res) {
    let _username =  req.params.username;



    User
      .getByUsername(_username)
      .then(user => {
        //Eigentlich sollten nur die Transactions zurückgegeben werden, das schaff ich aber derzeit noch nicht.
        res.status(200).json(user);
      });
  }

}
