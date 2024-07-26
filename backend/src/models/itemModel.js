const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

itemSchema.index({ name: "text", description: "text" });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
