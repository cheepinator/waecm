"use strict";

let mongoose = require("mongoose");
const Promise = require("bluebird");
const counterSchema = require("../model/counterModel");
const _ = require("lodash");

counterSchema.statics.getCounter = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Counter.findOne({})
            .exec((err, counter) => {
              if(err)
              {
                console.log("error");
                reject(err);
              }
              else
              {
                if(counter == null)
                {
                  resolve();
                }
                else
                {
                  resolve(counter);
                }
              }
            });
    });
};

counterSchema.statics.incrementCounter = (counter) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(counter)) {
        return reject(new TypeError("counter is not a valid object."));
      }

      counter.counter ++;
      counter.save((err, saved) => {
        err ? reject(err)
          : resolve(saved);
      });
    });
}

counterSchema.statics.createCounter = () => {
  return new Promise((resolve, reject) => {
    let _counter = new Counter();

    _counter.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

const Counter  = mongoose.model("Counter", counterSchema);

module.exports = Counter;
