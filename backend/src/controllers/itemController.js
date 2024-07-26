const Item = require("../models/itemModel");

exports.getItems = async (req, res) => {
  const items = await Item.find();
  if (!items) {
    return res.status(401).json({ message: "No items were found" });
  }
  res.status(200).json({ message: "Success", items });
};

exports.createItem = async (req, res) => {
  const { restaurantId, name, description, price, category, isAvailable } =
    req.body;

  const item = new Item({
    restaurantId,
    name,
    description,
    price,
    category,
    isAvailable,
    image: req.file.location,
  });

  await item.save();
  res.status(201).json(item);
};
