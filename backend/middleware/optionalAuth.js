const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

const optionalAuth = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select('-password');
    } catch (err) {
      // Token is invalid, proceed without authentication
      req.user = null;
    }
  } else {
    // No token provided, proceed without authentication
    req.user = null;
  }

  next();
};

module.exports = optionalAuth;
