const express = require("express");

const router = express.Router();

router.get("/", restaurants);
router.get("/:restaurantID", restaurant);

module.exports = router;
