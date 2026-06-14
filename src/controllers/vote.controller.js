import voteRepository from "../repositories/vote.repository.js";
import roomRepository from "../repositories/room.repository.js";



export const castVote = async (req, res) => {
    try {
        const {placeId, vote} = req.body; 
        const { roomId} = req.params; 


        if(!placeId || !vote){
            return res.status(400).json({ message: 'placeId and votes are required'});
        }

        if(!['like', 'dislike', 'superlike'].includes(vote)){
            return res.status(400).json({ message: 'Vote must be like, dislike, or superlike'}); 
        }


        const room = await roomRepository.findById(roomId); 

        if(!room){
            return res.status(404).json({ message: 'Room not found'});
        }


        const isMember = room.members.some(
            (member) => member._id.toString() === req.userId.toString()
        ); 

        if(!isMember){
            return res.status(403).json({ message: 'You are not a member of this room'}); 



        }

        const alreadyVoted = await voteRepository.findExisting(roomId, req.userId, placeId);
        if(alreadyVoted){
            return res.status(400).json({ message: 'You already voted on this place'}); 
        }

        await voteRepository.create({
            roomId, 
            userId: req.userId, 
            placeId, 
            vote
        }); 


        const membersVoted = await voteRepository.countUniqueVoters(roomId); 
        const totalMembers = room.members.length; 

        res.json({
            message: 'Vote recorded', 
            voteStats: {
                membersVoted,
                totalMembers, 
                display: `${membersVoted}/${totalMembers}`, 
            },
        });
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};