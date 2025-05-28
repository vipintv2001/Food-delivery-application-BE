const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema({
  restaurentName: {
    type: String,
    required: true,
  },
  restaurentImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cardDescription: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    enum: [
      "Chinese",
      "Indian",
      "Italian",
      "North Indian",
      "South Indian",
      "Mexican",
      "Arabian",
      "MultiCuisine",
      "bakery",
      "fast food",
      "cafe",
    ],
    default: [],
    required: true,
  },
  foodTypes: {
    type: [String],
    enum: ["veg", "non-veg"],
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  lattitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const restaurents = mongoose.model('restaurents',restaurentSchema);
module.exports = restaurents;
