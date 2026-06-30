import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({


    name: {
        type: String, 
        required: true, 
        trim: true,
    }, 


    hostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 

    }, 

    members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }],


    category: {
        type: String, 
        required: true, 
        enum: ['cafe', 'momo', 'hiking'], 
    }, 

    pin: {
        type: String, 
        unique: true, 
    }, 


    status: {
        type: String, 
        enum: ['active', 'completed'], 
        default: 'active', 
    }, 
    winnerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Place', 
        default: null, 
    }, 
}, { timestamps: true});



roomSchema.pre('save', async function () {
    if (!this.pin) {
        this.pin = Math.floor(1000 + Math.random() * 9000).toString();
    }
});



const Room = mongoose.model('Room', roomSchema); 

export default Room; 