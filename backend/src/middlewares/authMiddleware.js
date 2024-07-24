const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token) {
    return res.sendStatus(401); // Unauthorised if no token found
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token verification fails
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
