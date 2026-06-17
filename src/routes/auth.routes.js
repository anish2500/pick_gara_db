import express from 'express'; 
import {register, login, getProfile, uploadAvatar} from '../controllers/auth.controller.js'; 
import {protect} from '../middlewares/auth.middleware.js'; 
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router(); 

router.post ('/register', register); 
router.post('/login', login); 

router.get('/profile', protect, getProfile); 
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);



export default router; 