import mongoose from "mongoose"; 

const placeSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: true, 
        trim: true, 
    }, 
    category: {
        type: String, 
        required: true, 
        enum: ['cafe', 'momo', 'hiking'], 
    }, 


    image: {
        type: String, 
        required: true, 
    }, 

    rating: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 5
    }, 

    location: {
        type: String, 
        required: true,
        trim: true,  

    }, 
    priceRange: {
        type: String, 
        required: true, 
        trim: true, 
    }, 

    description: {
        type: String,
        required: true,
        trim: true,
    },


    isActive: {
        type: Boolean, 
        default: true, 
    }, 


}, {timestamps: true}); 

const Place = mongoose.model("Place", placeSchema); 

export default Place; 