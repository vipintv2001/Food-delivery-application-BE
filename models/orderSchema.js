const mongoose = require("mongoose");
const {cartSchema,cartSummarySchema} = require("./cartSchema");
const addressSchema = require('./addressSchema')

const orderSchema = new mongoose.Schema({
  userId: { type: String },
  deliveryBoy:{type:String},
  cart: [cartSchema],
  cartSummary:[cartSummarySchema],
  deliveryCharge: { type: Number },
  totalPrice: { type: Number },
  address:addressSchema,
  paymentStatus:{type:String},
  deliveryStatus:{type:String},
  estimatedTime:{type:Number}
},{ timestamps: true });

const orders = mongoose.model('orders',orderSchema)

module.exports = orders;
