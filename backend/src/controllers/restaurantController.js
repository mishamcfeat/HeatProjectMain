const Restaurant = require("../models/restaurantModel");

// get all restaurantSchema
exports.getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  if (!restaurants) {
    return res.status(401).json({ message: "No restaurants here" });
  }
  res.status(201).json({ message: "success" });
};

// get queried restaurant
exports.getRestaurantsStatic = async (req, res) => {
  const restaurant = await Restaurant.find(req.query);
  res.status(200).json({ products, nbHits: restaurant.length });
};

//get one restaurant
exports.getRestaurant = async (req, res) => {
  const restaurant = Restaurant.findOne({ __id });
  if (!restaurant) {
    res.status(404).json({ message: "No restaurant with this ID found" });
  }
  res.status(201).json({ message: "Success" });
};

// get open close status of restaurant? websockets required for caching info

// create restaurant uses user ID to link - requires amazon s3 buckets for url image creation

// update restaurant name or other details
