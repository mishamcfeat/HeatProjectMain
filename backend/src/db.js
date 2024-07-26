const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });
