"use strict";

const UserDAO = require("../dao/userDAO");

var express = require('express'),
  _       = require('lodash'),
  config  = require('../../auth/config/config'),
  jwt     = require('jsonwebtoken');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, {expiresIn: 60 * 60 * 5});
}


module.exports = class AuthController {
  static createUser(req, res) {
    console.log("start create User");

    let _user = req.body;

    UserDAO
      .createUser(_user)
      .then(user => {
        //res.status(201).json(todo)
        res.status(201).send({
          id_token: createToken(user)
        });
      })
      .catch(error => res.status(400).json(error));
  }

  static createToken(req, res) {

    let _user = req.body;

      console.log(_user);

      if (!_user.username || !_user.password) {
        return res.status(400).send("You must send the username and the password");
      }

    UserDAO
      .getByUsername(_user.username)
      .then(user => {

        if (!user) {
          return res.status(401).send("The username or password don't match");
        }

        if (user.password !== _user.password) {
          return res.status(401).send("The username or password don't match");
        }

        res.status(201).send({
          id_token: createToken(user)
        });
      })
      .catch(error => res.status(400).json(error));
  }
}
