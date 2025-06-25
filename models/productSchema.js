const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
  restaurentId: {
    type: String,
    required: true,
  },
  restaurentName:{
    type:String,
    required:true
  }
});

const products = mongoose.model('products',productSchema);

module.exports = products;