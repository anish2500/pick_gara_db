import jwt from 'jsonwebtoken'; 

export const protect = (req, res, next) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1]; 

        if(!token){
            return res.status(401).json({message: 'No token provided'});

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = decoded.userId; 
        next(); 
    } catch (error){
        return res.status(401).json({ message: 'Invalid or expired token'});
    }
};


export const protectAdmin = (req, res, next) =>{

    try{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if(!decoded.adminId){
        return res.status(403).json({ message: 'Access denied. Admins only'});
    }

    req.adminId = decoded.adminId; 
    next(); 

    } catch (error){
        return res.status(401).json({ message: 'Invalid or expired token'});
    }
};