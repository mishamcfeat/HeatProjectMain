const express = require("express");
const uploadRestaurant = require("../middleware/uploadRestaurant");
const authenticateToken = require("../middleware/authenticateToken");

const {
  getRestaurants,
  searchRestaurants,
  createRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", getRestaurants);
router.get("/search", searchRestaurants);
router.post(
  "/create",
  authenticateToken,
  uploadRestaurant.single("imageUrl"),
  createRestaurant
);

module.exports = router;
