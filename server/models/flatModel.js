const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flatSchema = new Schema({
  flat: {
    price: {
      type: Number,
      default: 0,
    },
    rooms: {
      type: Number,
      default: 0,
    },
    beds: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "Unknown",
    },
    description: {
      type: String,
      default: "N/A",
    },
  },
});

module.exports = {
  Flat: mongoose.model("Flat", flatSchema),
  flatSchema: flatSchema,
};
