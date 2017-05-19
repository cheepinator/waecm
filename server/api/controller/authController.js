"use strict";

const UserDAO = require("../dao/userDAO");
const TestDataController = require("../controller/testdataController");

var express = require('express'),
  _ = require('lodash'),
  config = require('../../auth/config/config'),
  jwt = require('jsonwebtoken'),
  async = require('async');

function createToken(user) {
  //console.log("creating token");
  return jwt.sign(_.omit(user, 'password'), config.secret, {expiresIn: 60 * 60 * 5});
}


module.exports = class AuthController {
  static createUser(req, res) {
    //console.log("start create User");

    let _user = req.body;

    UserDAO
      .createUser(_user)
      .then(user => {
        res.status(201).send({
          id_token: createToken(user)
        });
      })
      .catch(error => res.status(400).json(error));
  }

  static createToken(req, res) {

    UserDAO
      .getAllUsers()
      .then(users => {
          if(users.length == 0)
          {
            //console.log("no users available. create default users...");
            TestDataController
              .generateTestData()
              .then(
                returnValue => {
                  login(req, res);
                }
              )
          }
          else
            login(req, res);
        }
      )
  }
};

function login(req, res) {
    let _user = req.body;

    if (!_user.username || !_user.password) {
      return res.status(400).send("You must send the username and the password");
    }

    //console.log("checking username server");
    UserDAO
      .getByUsername(_user.username)
      .then(user => {

        if (!user) {
          return res.status(401).send("The username or password don't match");
        }

        let crypto = require('crypto');


        if (user.password !== crypto.createHash('sha256').update(_user.password).digest('hex')) {
          return res.status(401).send("The username or password don't match");
        }

        //token only needs username, not whole user databaseObject
        let userDTO = {
          'username': user.username,
          'firstName': user.firstName,
          'lastName': user.lastName
        };

        res.status(201).send({
          id_token: createToken(userDTO)
        });
      })
      .catch(error => res.status(400).json(error));
}
