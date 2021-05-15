const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  creates_at: {
    type: Date,
    default: new Date().getTime(),
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("user", userSchema);
