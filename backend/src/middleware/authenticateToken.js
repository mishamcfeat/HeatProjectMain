const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" }); // Unauthorized if no token found
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden: Token verification failed",
        error: err.message,
      }); // Forbidden if token verification fails
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
