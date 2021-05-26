const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  posted_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("profile_image", ProfileSchema);
