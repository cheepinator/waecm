"use strict";

const CounterDAO = require("../dao/counterDAO");

module.exports = class CounterController {
  static getCounter(req, res) {

      CounterDAO
        .getCounter()
        .then(
          counter => {
            if(counter == null){
              CounterDAO
                .createCounter()
                .then(counterRes => res.status(201).json(counterRes.counter))
                .catch(errorRes => res.status(400).json(errorRes));
            }else{
              res.status(200).json(counter.counter);
            }
          })
        .catch(error => res.status(400).json(error));
  }

  static incrementCounter(req, res) {

    CounterDAO
      .getCounter()
      .then(
        counter => {
          if(counter == null){
            console.log("create new counter post")
            CounterDAO
              .createCounter()
              .then(counterRes => res.status(201).json(counterRes.counter))
              .catch(errorRes => {
                console.log("error at create new post");
                res.status(400).json(errorRes);
              });
          }
          else {
            CounterDAO
              .incrementCounter(counter)
              .then(counterRes => res.status(201).json(counterRes.counter))
              .catch(errorRes => {
                console.log("error at increment");
                res.status(400).json(errorRes);
              });
          }
      })
      .catch(error => {
        console.log("Error at get");
        res.status(400).json(error);
      });
  }
}
