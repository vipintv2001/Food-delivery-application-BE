const mongoose = require("mongoose");
const restaurents = require("./restaurentSchema");
const addressSchema = require("./addressSchema")

const cartSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  restaurentId: {
    type: String,
  },
  restaurentName: {
    type: String,
  },
});

const cartSummarySchema = new mongoose.Schema({
  gst: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  restaurentId: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  deliveryCharge: {
    type: Number,
  },
  address: addressSchema
});

module.exports = { cartSchema, cartSummarySchema };
