"use strict";

let mongoose = require("mongoose");
const Promise = require("bluebird");
const todoSchema = require("../model/counterModel");
const _ = require("lodash");

counterSchema.statics.getCounter = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Counter.findOne(_query)
            .exec((err, counter) => {
              err ? reject(err)
                  : resolve(counter.counter);
            });
    });
};

counterSchema.statics.incrementCounter = () => {
    return new Promise((resolve, reject) => {

      let _query = {};

      let _counter = Counter.findOne(_query);

      _counter.counter ++;

      _counter.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

const Counter  = mongoose.model("Counter", counterSchema);

module.exports = Counter;
