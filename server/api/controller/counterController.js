"use strict";

const CounterDAO = require("../dao/counterDAO");

module.exports = class CounterController {
  static getCounter(req, res) {
      CounterDAO
        .getCounter()
        .then(counter => res.status(200).json(counter))
        .catch(error => res.status(400).json(error));
  }

  static incrementCounter(req, res) {
    CounterDAO
        .incrementCounter()
        .then(counter => res.status(201).json(counter))
        .catch(error => res.status(400).json(error));
  }
}
