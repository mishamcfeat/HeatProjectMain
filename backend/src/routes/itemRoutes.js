const express = require("express");
const uploadItem = require("../middleware/uploadItem");
const { getItems, createItem } = require("../controllers/itemController");

const router = express.Router();

router.get("/", getItems);
router.post("/", uploadItem.single("image"), createItem);

module.exports = router;
