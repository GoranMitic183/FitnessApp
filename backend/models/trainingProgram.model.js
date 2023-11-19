const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingProgram = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    program: { type: Array },
  },
  { collection: "trainingProgram" }
);

const Program = mongoose.model("trainingProgram", trainingProgram);

module.exports = Program;
