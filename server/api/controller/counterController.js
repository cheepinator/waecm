"use strict";

const CounterDAO = require("../dao/counterDAO");

module.exports = class CounterController {
  static getCounter(req, res) {


      CounterDAO
        .getCounter()
        .then(counter => res.status(200).json(counter))
        .catch(error => res.status(400).json(error));
  }

  static createCounter(req, res) {
    let _counter = req.body;

    CounterDAO
      .createCounter(_counter)
      .then(todo => res.status(201).json(todo))
      .catch(error => res.status(400).json(error));
  }

  static incrementCounter(req, res) {
    console.log("post");
    CounterDAO
        .incrementCounter()
        .then(counter => res.status(201).json(counter))
        .catch(error => res.status(400).json(error));
  }
}
