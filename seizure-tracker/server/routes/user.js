import express from 'express';
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users/me - Get current logged in user
router.get('/me', protect, async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    res.json(req.user); // Already sanitized in middleware
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
