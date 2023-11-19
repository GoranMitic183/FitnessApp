const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inboxSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: false },
    message: { type: String, required: true },
    date: { type: String, required: true }
  },
  { collection: "inbox" }
);

const Inbox = mongoose.model("inboxSchema", inboxSchema);

module.exports = Inbox;