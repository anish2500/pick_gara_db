import express from 'express'; 
import {protectAdmin} from '../middlewares/auth.middleware.js'; 

import { createPlace, updatePlace, deletePlace, getAllPlaces, getPlaceById } from '../controllers/place.controller.js';

const router = express.Router(); 


router.get('/', getAllPlaces); 

router.get('/:id', getPlaceById); 

router.post('/', protectAdmin, createPlace); 
router.put('/:id', protectAdmin, updatePlace); 
router.delete('/:id', protectAdmin, deletePlace); 

export default router; 