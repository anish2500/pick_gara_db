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


    async addMember(roomId, userId){
       return await Room.findByIdAndUpdate(
         roomId, 
        { $addToSet: {members: userId}}, 
        {new : true}
       );
    }
}

export default new RoomRepository();


