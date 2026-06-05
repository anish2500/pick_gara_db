import placeRepository from "../repositories/place.repository.js";
import { createPlaceSchema, updatePlaceSchema } from "../validations/place.validation.js";



export const createPlace = async (req, res) =>{
    try {
        const validatedData = createPlaceSchema.parse(req.body);

        const place = await placeRepository.create(validatedData); 


        res.status(201).json({
            message: 'Place created successfully', 
            place, 
        }); 


    } catch (error){
        if(error.errors){
            return res.status(400).json({message: 'Validation error', errors: error.errors}); 
        }

        res.status(500).json({ message: 'Server error', error: error.message});
    }
};


export const updatePlace = async (req, res) =>{
    try{
        const validatedData = updatePlaceSchema.parse(req.body); 


        const place = await placeRepository.findById(req.params.id); 

        if(!place){
            return res.status(404).json({message: 'Place not found'}); 
        }

        const updatedPlace = await placeRepository.update(req.params.id, validatedData); 


        res.json({
            message: 'Place updated successfully', 
            place: updatedPlace, 

        }); 
    }catch (error){
        if(error.errors){
            return res.status(400).json({message: 'Validation error', errors: error.errors}); 
        }
        res.status(500).json({message: 'Server error', error: error.message}); 
    }
};

export const deletePlace = async (req, res) =>{
    try {
        const place = await placeRepository.findById(req.params.id);
        if(!place){
            return res.status(404).json({ message: 'Place not found'}); 
        }

        await placeRepository.delete(req.params.id);
        
        res.json({message: 'Place deleted Successfully'}); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};


export const getAllPlaces = async(req, res) =>{
    try {
         const { category} = req.query; 

         const places = await placeRepository.findAll(category); 

         res.json ({
            count: places.length, 
            places, 
         }); 


    }catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
}; 


export const getPlaceById = async (req, res) =>{
    try {
        const place = await placeRepository.findById(req.params.id); 

        if(!place){
            return res.status(404).json({ message: 'Place not found'}); 
        }

        res.json({ place}); 
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message}); 
    }
}; 

