const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const roomSchema = new Schema({
  room_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().getTime(),
  },
  code: String,
  users: [String],
  messages: [messageSchema],
  admin: String,
});

module.exports = new mongoose.model("room", roomSchema);
