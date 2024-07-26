const Restaurant = require("../models/restaurantModel");

exports.getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  if (!restaurants) {
    return res.status(401).json({ message: "No restaurants here" });
  }
  res.status(200).json({ message: "success", restaurants });
};

exports.searchRestaurants = async (req, res) => {
  // Extract the key and value from req.query
  const key = Object.keys(req.query)[0];
  const value = req.query[key];

  // Build the query object dynamically
  // regex allows for partial matching of paramters
  const query = { [key]: { $regex: value, $options: "i" } };

  // Execute the query
  const restaurants = await Restaurant.find(query);

  // Send the response
  res.status(200).json({ restaurants, nbHits: restaurants.length });
};

exports.createRestaurant = async (req, res) => {
  const { name, location, opening, cuisineType, closing } = req.body;

  const restaurant = new Restaurant({
    name,
    location,
    cuisineType,
    hours: {
      opening,
      closing,
    },
    items: [],
    owner: req.user.id,
    imageUrl: req.file.location,
  });

  await restaurant.save();
  res
    .status(201)
    .json({ message: "Restaurant created successfully", restaurant });
};

// get open close status of restaurant? websockets required for caching info

// update restaurant name or other details
