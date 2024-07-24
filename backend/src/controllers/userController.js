const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Account with this email already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(200).json({ message: "User account created successfully" });
};

exports.login = async (req, res) => {
  // email and password included in request
  const { email, password } = req.body;
  // find new User Model object by using email
  const user = await User.findOne({ email });
  // if user does not exist sending error message
  if (!user) {
    return res
      .status(400)
      .json({ message: "User email does not match any records" });
  }

  // check that inputted password matches hashed password using bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);
  // errror message if passwords don't match
  if (!passwordMatch) {
    return res
      .status(400)
      .json({ message: "User password is incorrect. Please try again" });
  }

  // generate jwt token using PROCESS ENV jwt secret
  const token = generateToken(user._id);
  // send back response containing the token
  res.cookie("token", token, {
    httpOnly: true, // Prevents access to the cookie via JavaScript - prevent XSS attacks
    secure: true, // Ensures the cookie is sent over HTTPS
    sameSite: "Strict", // Prevents the cookie from being sent with cross-site requests
  });
  // Returned user object to store in redux store for frontend use
  res.status(200).json({
    message: "Logged in succesfully",
    user: { id: user._id, name: user.name, email: user.email },
  });
};
