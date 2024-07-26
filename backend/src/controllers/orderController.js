const Order = require("../models/orderModel");
const auth = require("../middlewares/authMiddleware");

// exports.neworder;
exports.neworder = async (req, res) => {
  const {
    restaurantId,
    items,
    deliveryAddress,
    paymentMethod,
    specialInstructions,
  } = req.body;

  // Validate required fields
  if (!restaurantId || !items || !deliveryAddress || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const order = new Order({
    userId: req.user.id,
    restaurantId: restaurantId,
    items: items.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price,
    })),
    deliveryAddress: deliveryAddress,
    paymentMethod: paymentMethod,
    specialInstructions: specialInstructions || "",
    // For an online platform, we can set paymentStatus based on the paymentMethod
    paymentStatus: paymentMethod === "online" ? "paid" : "pending",
    status: "pending",
  });

  // Save the order
  const savedOrder = await order.save();

  res.status(201).json(savedOrder);
};

// updateorder;
// cancelorder;
// getorder;
