const User = require('../models/User');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

// Signup
exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: 'User signed in successfully', success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.verifyToken = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);
    if (user) {
      res.status(200).json({ status: true, user });
    } else {
      res.status(401).json({ status: false, message: 'Invalid token' });
    }
  } catch (err) {
    res.status(401).json({ status: false, message: 'Token verification failed' });
  }
};