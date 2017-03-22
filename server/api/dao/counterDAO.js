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
                //createCounter();
              }
              else
              {
                if(counter == null)
                {
                  console.log("error2");
                  /*let _counter = new Counter();
                  _counter.save((err, saved) => {
                    err ? reject(err)
                      : resolve(saved);
                  });*/
                  resolve();
                }
                else
                {

                  resolve(counter);
                  console.log(counter.counter);
                }
              }
            });
    });
};

counterSchema.statics.incrementCounter = () => {
    return new Promise((resolve, reject) => {

      let _counter = Counter.findOne({}).exec((err, counter) => {
        if(err)
        {
          console.log("error");
        }
        else
        {
            console.log(counter.counter);
            console.log(counter);
            counter.counter ++;
            console.log(counter.counter);
            counter.save((err, saved) => {
              err ? reject(err)
                : resolve(saved);
            });
        }
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
