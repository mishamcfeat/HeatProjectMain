const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");

// Import routes for backend
const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require('./routes/orderRoutes');
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  credentials: true, // Allow cookies to be sent
};

// middleware usage
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes for backend
app.use("/users", userRoutes);
// app.use('/orders', orderRoutes);
app.use("/restaurants", restaurantRoutes);

// removed the need to set up try catch blocks as express async errors takes care of this
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
