import express from 'express';
import { toggleBookmark, getBookmarks } from '../controllers/bookmark.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/bookmarks', protect, getBookmarks);
router.post('/bookmarks/:placeId', protect, toggleBookmark);

export default router;
