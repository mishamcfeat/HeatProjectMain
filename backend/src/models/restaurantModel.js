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
      "Thai",
      "Fast Food",
      "Breakfast",
      "Halal",
      "Pizza",
      "Healthy",
      "Bubble Tea",
      "Coffee",
      "Korean",
      "Sushi",
      "Burgers",
      "Chinese",
      "Comfort Food",
      "Vietnamese",
      "Indian",
      "Mexican",
      "Desserts",
      "Sandwich",
      "Wings",
      "Italian",
      "American",
      "Greek",
      "BBQ",
      "Japanese",
      "Bakery",
      "Ice Cream",
      "Caribbean",
      "Asian",
      "Street Food",
      "Vegan",
      "Salads",
      "Seafood",
      "Soup",
      "Smoothies",
      "Soul Food",
      "Alcohol",
    ],
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
