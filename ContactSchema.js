const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  admin_mail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ContactSchema", ContactSchema);
