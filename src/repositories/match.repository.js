import Room from "../models/room.js"; 

class MatchRepository {
    async findByUser(userId, limit = 0) {
        const query = Room.find({
            members: userId, 
            status: 'completed', 

        })
        .populate('winnerId')
        .populate('hostId', 'fullName')
        .sort({ updatedAt: -1});


        if(limit>0) query.limit(limit); 
        return await query; 
    }


}

export default new MatchRepository();