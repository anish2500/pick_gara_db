import express from 'express'; 

import { protect} from '../middlewares/auth.middleware.js'; 
import { createRoom } from '../controllers/room.controller.js';

const router = express.Router(); 



router.post('/', protect, createRoom); 

export default router; 