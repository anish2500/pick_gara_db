import matchRepository from "../repositories/match.repository.js";

export const getMatches = async (req, res) =>{
    try {
        const matches= await matchRepository.findByUser(req.userId); 

        res.json({ matches});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};

export const getRecentMatches = async (req, res)=> {
    try {
        const limit = parseInt(req.query.limit) || 5;

        const matches = await matchRepository.findByUser(req.userId, limit); 
        res.json({ matches});

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};