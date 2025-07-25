import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { sendEmergencyAlert } from '../controllers/alertController.js';

const router = express.Router();
router.post('/emergency', protect, sendEmergencyAlert);

export default router;
