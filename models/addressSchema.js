const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: Number },
  HouseName: { type: String },
  street: { type: String },
  postOffice: { type: String },
  pinCode: { type: Number },
  landMark: { type: String },
  city: { type: String },
});

module.exports = addressSchema;
