import roomRepository from "../repositories/room.repository.js";
import placeRepository from "../repositories/place.repository.js";


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

        const updatedRoom = await roomRepository.addMember(room._id, req.userId); 

        res.json({
            message: 'Joined room successfully', 
            room: updatedRoom, 
        }); 
    }catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
}


