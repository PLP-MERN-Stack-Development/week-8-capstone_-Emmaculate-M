import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      fullName: user.fullName ?? '',
      age: user.age ?? '',
      medicalHistory: user.medicalHistory ?? '',
      emergencyContact: user.emergencyContact ?? '',
      profilePic: user.profilePic ?? '',
      email: user.email ?? '',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/emergency-contact
router.get('/emergency-contact', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('emergencyContact');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ emergencyContact: user.emergencyContact ?? '' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/users - Update user profile
router.patch('/', authMiddleware, async (req, res) => {
  try {
    const { fullName, email, medicalHistory, age, profilePic } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.fullName = fullName ?? user.fullName;
    user.email = email ?? user.email;
    user.medicalHistory = medicalHistory ?? user.medicalHistory;
    user.age = age ?? user.age;
    user.profilePic = profilePic ?? user.profilePic;

    await user.save();

    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    res.json({ message: 'User updated successfully', user: sanitizedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/users/emergency-contact
router.patch('/emergency-contact', authMiddleware, async (req, res) => {
  try {
    const { emergencyContact } = req.body;

    const isValidContact = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{7,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    };

    if (!emergencyContact || !isValidContact(emergencyContact)) {
      return res.status(400).json({ message: 'Emergency contact must be a valid email or phone number' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.emergencyContact = emergencyContact;
    await user.save();

    res.json({ message: 'Emergency contact updated', emergencyContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
