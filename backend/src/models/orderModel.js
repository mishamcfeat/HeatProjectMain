const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "card", "online"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    specialInstructions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
