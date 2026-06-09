import express from 'express'; 

import { protect} from '../middlewares/auth.middleware.js'; 
import { createRoom, joinRoom } from '../controllers/room.controller.js';

const router = express.Router(); 



router.post('/', protect, createRoom); 
router.post('/join', protect, joinRoom);

export default router; 