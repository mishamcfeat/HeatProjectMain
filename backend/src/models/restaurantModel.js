const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }], // Array of ObjectIds
  status: { type: String, default: "Open" },
  hours: {
    opening: { type: String, required: true },
    closing: { type: String, required: true },
  },
  location: { type: String, required: true },
  imageURL: { type: String, required: true },
  cuisineType: {
    type: [String],
    enum: [
      "Grocery",
      "Fast Food",
      "Breakfast",
      "Halal",
      "Healthy",
      "Coffee",
      "Sushi",
      "Burgers",
      "Chinese",
      "Indian",
      "Wings",
      "Italian",
      "Bakery",
      "Ice Cream",
      "Asian",
      "Vegetarian",
      "Salads",
      "Seafood",
      "Soup",
      "Smoothies",
      "Alcohol",
    ],
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
