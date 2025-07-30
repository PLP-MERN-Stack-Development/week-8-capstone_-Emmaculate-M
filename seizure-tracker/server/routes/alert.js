import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import sendAlert from '../utils/sendAlert.js';
import User from '../models/User.js';

const router = express.Router();

// POST /api/alerts/emergency
router.post('/emergency', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.emergencyContact) {
      return res.status(400).json({ message: 'Emergency contact not set' });
    }

    const result = await sendAlert(user.fullName, user.emergencyContact);

    res.status(200).json({ message: result.message || 'Alert sent successfully' });
  } catch (error) {
    console.error('Error sending alert:', error);
    res.status(500).json({ message: 'Failed to send alert' });
  }
});

export default router;
