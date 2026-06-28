import mongoose from "mongoose";
import Vote from "../models/vote.js";


class VoteRepository {

    async create(voteData){
        return await Vote.create(voteData); 



    }

    async findExisting(roomId, userId, placeId){
        return await Vote.findOne({roomId, userId, placeId});
    }


    async countLikes(roomId, placeId){
        return await Vote.countDocuments({
            roomId, 
            placeId, 
            vote: {$in: ['like', 'superlike']}, 

        });
    }


      async countUniqueVoters(roomId) {
    const voters = await Vote.distinct('userId', { 
        roomId: new mongoose.Types.ObjectId(roomId) 
    });
    return voters.length;
}

  async getPlaceTallies(roomId) {
        return await Vote.aggregate([
            { $match: { roomId: new mongoose.Types.ObjectId(roomId) } },
            {
                $group: {
                    _id: '$placeId',
                    likes: {
                        $sum: {
                            $cond: [{ $in: ['$vote', ['like', 'superlike']] }, 1, 0]
                        }
                    },
                    dislikes: {
                        $sum: {
                            $cond: [{ $eq: ['$vote', 'dislike'] }, 1, 0]
                        }
                    },
                    total: { $sum: 1 }
                }
            }
        ]);
    }


    async hasSuperVoted(roomId, userId){
        const existing = await Vote.findOne({
            roomId, 
            userId, 
            vote: 'superlike', 
        });

        return !!existing;
    }


    async getSuperVotedPlaces(roomId){
        return await Vote.find({
            roomId: new mongoose.Types.ObjectId(roomId), 
            vote: 'superlike', 

        })
        .populate('placeId')
        .populate('userId', 'fullName');
    }

 



}



export default new VoteRepository();

