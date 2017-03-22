"use strict";

const mongoose = require("mongoose");

const counterSchema = {
    counter: {type: Number, default: 0}
}

module.exports = mongoose.Schema(counterSchema);
