import roomRepository from "../repositories/room.repository.js";
import placeRepository from "../repositories/place.repository.js";
import voteRepository from "../repositories/vote.repository.js";


export const createRoom = async (req, res) =>{
    try {
        const { name, category} = req.body; 

        if(!name || !category){
            return res.status(400).json({ message: 'Name and category are required '});

        }

        if (!['cafe', 'momo', 'hiking'].includes(category)){
            return res.status(400).json({ message: 'Category must be cafe, momo or hiking'});

        }


        const room = await roomRepository.create({
            name, 
            category, 
            hostId: req.userId, 
            members: [req.userId], 

        });

        res.status(201).json({
            message: 'Room created successfully', 
            room, 
        });
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};


export const joinRoom = async (req, res) => {
    try {
        const {pin} = req.body; 

        if(!pin){
            return res.status(400).json({ message: 'PIN is required'});

        }


        const room = await roomRepository.findByPin(pin);


        if (!room){
            return res.status(404).json({
                message: 'Room not found or no longer exists'
            });
        }
        const isAlreadyMember = room.members.some(
            (memberId) => memberId.toString() === req.userId.toString()
        );

        if(isAlreadyMember){
            const existingRoom = await roomRepository.findById(room._id);
            return res.json({
                message: 'Rejoined room successfully', 
                room: existingRoom, 
            }); 
        }

        const updatedRoom = await roomRepository.addMember(room._id, req.userId); 

        res.json({
            message: 'Joined room successfully', 
            room: updatedRoom, 
        }); 
    }catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
}


export const getActiveRooms = async (req, res) =>{
    try {
        const rooms = await roomRepository.findActiveByUser(req.userId); 


        res.json({
            count: rooms.length, 
            rooms, 
        });


    }catch (error){
        res.status(500).json({
            message: 'Server error', error: error.message
        });
    }
}
export const getRoomById = async (req, res) => {
    try {

        const room = await roomRepository.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

       
        const isMember = room.members.some(
            (member) => member._id.toString() === req.userId.toString()
        );

        if (!isMember) {
            return res.status(403).json({ message: 'You are not a member of this room' });
        }

       
        const places = await placeRepository.findAll(room.category);


        const membersVoted = await voteRepository.countUniqueVoters(room._id);
        const totalMembers = room.members.length;


        const placeTallies = await voteRepository.getPlaceTallies(room._id);

        res.json({
            room,
            places,
            voteStats: {
                membersVoted,
                totalMembers,
                display: `${membersVoted}/${totalMembers}`,  
                placeTallies,   
            },
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const deleteRoom = async(req, res) =>{
    try {
        const room = await roomRepository.findById(req.params.id); 

        if(!room){
            return res.status(404).json({ message: 'Room not found'}); 
        }

        if(room.hostId.toString() !== req.userId.toString()){
            return res.status(403).json({ message: 'Only the host can delete this room'});
        }

        await roomRepository.deleteRoom(req.params.id); 

        res.json({ message: 'Room deleted successfully'});
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};
