import express from 'express'; 

import { protect} from '../middlewares/auth.middleware.js'; 
import { createRoom, joinRoom , getActiveRooms, getRoomById} from '../controllers/room.controller.js';

const router = express.Router(); 



router.post('/', protect, createRoom); 
router.post('/join', protect, joinRoom);
router.get('/active', protect, getActiveRooms);
router.get('/:id', protect, getRoomById); 

export default router; 