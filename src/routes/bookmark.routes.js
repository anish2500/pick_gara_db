import express from 'express';
import { toggleBookmark, getBookmarks } from '../controllers/bookmark.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getBookmarks);
router.post('/:placeId', protect, toggleBookmark);

export default router;
