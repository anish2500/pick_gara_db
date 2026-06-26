import Room from "../models/room.js";

class RoomRepository {
    async create(roomData){
        return await Room.create(roomData); 
    }

    async findByPin(pin){
        return await Room.findOne({
            pin, status: 'active'
        });
    }

    async findById(id){
        return await Room.findById(id).populate('members', 'fullName email');
    }


    async findActiveByUser(userId){
        return await Room.find({
            members: userId, 
            status: 'active', 
        }).sort({ createdAt: -1});
    }


   async addMember(roomId, userId) {
    return await Room.findByIdAndUpdate(
        roomId,
        { $addToSet: { members: userId } },
        { returnDocument: 'after' }  
     );
    }


    async deleteRoom(id){
        return await Room.findByIdAndDelete(id); 
    }

    async findHostedByUser(userId, limit = 0){
        const query = Room.find({
            hostId: userId,
            status: 'active',
        }).sort({ createdAt: -1 });
        if (limit > 0) query.limit(limit);
        return await query;
    }

    async findJoinedByUser(userId, limit = 0){
        const query = Room.find({
            members: userId,
            hostId: { $ne: userId },
            status: 'active',
        }).sort({ createdAt: -1 });
        if (limit > 0) query.limit(limit);
        return await query;
    }

}

export default new RoomRepository();


