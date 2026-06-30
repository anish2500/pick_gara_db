import express from 'express'; 

import { protect} from '../middlewares/auth.middleware.js'; 
import { createRoom, joinRoom , getActiveRooms, getRoomById, deleteRoom, getCompletedRooms, completeRoom,} from '../controllers/room.controller.js';
import { castVote } from '../controllers/vote.controller.js';

const router = express.Router(); 



router.post('/', protect, createRoom); 
router.post('/join', protect, joinRoom);
router.get('/active', protect, getActiveRooms);
router.post('/:roomId/vote', protect, castVote); 
router.get('/completed', protect, getCompletedRooms); 
router.post('/:id/complete', protect, completeRoom);
router.delete('/:id', protect, deleteRoom);  
router.get('/:id', protect, getRoomById); 


export default router; 