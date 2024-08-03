const express = require('express');
const { Signup, Login, verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', Signup);
router.post('/login', Login);
router.get('/verify', verifyToken); // Add this route

module.exports = router;
