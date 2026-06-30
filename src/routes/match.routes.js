import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getMatches, getRecentMatches } from '../controllers/match.controller.js';

const router = express.Router();

router.get('/', protect, getMatches);
router.get('/recent', protect, getRecentMatches);

export default router;
