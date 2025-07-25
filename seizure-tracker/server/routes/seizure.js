import express from 'express';
import { addSeizure, getSeizures, deleteSeizure } from '../controllers/seizureController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
  .get(protect, getSeizures)
  .post(protect, addSeizure);

router.delete('/:id', protect, deleteSeizure);

export default router;
