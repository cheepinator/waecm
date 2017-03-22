"use strict";

const CounterDAO = require("../dao/counterDAO");

module.exports = class CounterController {
  static getCounter(req, res) {

      CounterDAO
        .getCounter()
        .then(
          () => {
            console.log("TEST1");
            CounterDAO
              .createCounter()
              .then(counterRes => res.status(201).json(counterRes.counter))
              .catch(errorRes => res.status(400).json(errorRes));
          },
          counter => res.status(200).json(counter.counter))
        .catch(error => res.status(400).json(error));
  }

  static incrementCounter(req, res) {
    console.log("post");

    CounterDAO
      .getCounter()
      .then(
        () => {
          CounterDAO
            .createCounter()
            .then(counterRes => res.status(201).json(counterRes))
            .catch(errorRes => res.status(400).json(errorRes));
        },
        counter => {
          CounterDAO
            .incrementCounter(counter)
            .then(counterRes => res.status(201).json(counterRes.counter))
            .catch(errorRes => res.status(400).json(errorRes));
      })
      .catch(error => res.status(400).json(error));
  }
}
