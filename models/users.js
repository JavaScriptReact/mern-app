const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImageId: String,
  username: {
    type: String,
    requried: true,
  },
  created_at: {
    type: Number,
    default: new Date().getTime(),
  },
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", userSchema);
