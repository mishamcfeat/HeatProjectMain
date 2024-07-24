const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  RestaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  Name: { type: String, required: true },
  Cost: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
