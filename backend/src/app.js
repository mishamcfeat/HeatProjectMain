const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");

// Import routes for backend
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes for backend
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/items", itemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

module.exports = app;
