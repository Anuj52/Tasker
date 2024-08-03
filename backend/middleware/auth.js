// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protect = async (req, res, next) => {
  const token = req.cookies.token; // Token from cookies

  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ status: false, message: 'Invalid token' });
    }
  } catch (err) {
    res.status(401).json({ status: false, message: 'Token verification failed' });
  }
};

module.exports = { protect };
