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


