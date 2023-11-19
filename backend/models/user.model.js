const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hpassword: { type: String, required: false },
    email: { type: String, required: true },
    role: { type: Number, required: true, default: 0}
  },
  { collection: "users" }
);

const User = mongoose.model("userSchema", userSchema);

module.exports = User;
