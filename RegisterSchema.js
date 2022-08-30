const mongoose = require("mongoose");

const registerUser = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  c_password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("registerUser", registerUser);
