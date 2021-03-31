const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doorSchema = new Schema({
  door: {
    i1: {
      type: Number,
      default: 0,
    },
    i2: {
      type: Number,
      default: 0,
    },
    i3: {
      type: Number,
      default: 0,
    },
    i4: {
      type: Number,
      default: 0,
    },
    i5: {
      type: Number,
      default: 0,
    },
    i6: {
      type: Number,
      default: 0,
    },
    i7: {
      type: Number,
      default: 0,
    },
    i8: {
      type: Number,
      default: 0,
    },
    i9: {
      type: Number,
      default: 0,
    },
    n1: {
      type: Number,
      default: 0,
    },
    n2: {
      type: Number,
      default: 0,
    },
    n3: {
      type: Number,
      default: 0,
    },
    e: {
      type: Number,
      default: 0,
    },
    o1: {
      value: {
        type: Number,
      },
      open: {
        type: Boolean,
      },
    },
    o2: {
      value: {
        type: Number,
      },
      open: {
        type: Boolean,
      },
    },
    o3: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = {
  Door: mongoose.model("Door", doorSchema),
  doorSchema: doorSchema,
};
