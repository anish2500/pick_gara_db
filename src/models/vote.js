
import mongoose from "mongoose"; 

const voteSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true, 
    }, 

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required:true, 
    }, 

    placeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Place', 
        required: true, 
    }, 


    vote: {
        type: String, 
        enum: ['like', 'dislike', 'superlike'], 
        required: true, 
    },
}, {timestamps: true});

voteSchema.index({roomId:1 , userId: 1, placeId: 1}, {unique: true});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote; 