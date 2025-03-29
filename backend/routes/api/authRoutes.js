// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser,getAllUser } = require('../../controller/authController');
const { protect } = require('../../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.get('/allusers',protect,getAllUser);
module.exports = router;