const mongoose = require("mongoose");

const computerModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide computer name"],
  },
  brand: {
    type: String,
    required: [true, "Please provide computer brand"],
  },
  screen: {
    type: String,
    required: [true, "Please provide screen size"],
  },
  ram: {
    type: Number,
    required: [true, "Please provide RAM size"],
  },
  rom: {
    type: Number,
    required: [true, "Please provide ROM size"],
  },
  oSystem: {
    type: String,
    required: [true, "Please provide System name"],
  },
  battery: {
    type: String,
    required: [true, "Please provide battery size"],
  },
  weight: {
    type: Number,
    required: [true, "Please provide weight size"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    min: [10000000, "Price must larger than 10m"],
  },
});

const Computer = mongoose.model("Computer", computerModel);
module.exports = Computer;
