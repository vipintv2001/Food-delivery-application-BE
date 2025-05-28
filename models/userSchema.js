const mongoose = require("mongoose");
const { cartSchema, cartSummarySchema } = require("./cartSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  cart:[cartSchema],
  cartSummary:[cartSummarySchema]
});

const users = mongoose.model("users", userSchema);
module.exports = users;
