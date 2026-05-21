import jwt from 'jsonwebtoken';
import { registerAdminSchema, loginAdminSchema } from '../validations/admin.validation.js';
import adminRepository from '../repositories/admin.repository.js';


export const register = async (req, res) =>{
    try{
        const validatedData = registerAdminSchema.parse(req.body);

        const existingAdmin = await adminRepository.findByEmail(validatedData.email);
        if (existingAdmin){
            return res.status(400).json({
                message: 'Admin with this email already exists'
            });
        }

        const admin = await adminRepository.create(validatedData); 

        const token = jwt.sign(
            {adminId: admin._id},
            process.env.JWT_SECRET, 
            {expiresIn: '7d'}
        );

        res.status(201).json({
            message: 'Admin registered successfully', 
            token, 
            admin: {
                id: admin._id, 
                fullName: admin.fullName, 
                email: admin.email, 
            }
        });
    } catch (error){
        if(error.errors){
            return res.status(400).json({
                message: 'Validation error', 
                error: error.errors
            });
        }
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};


export const login = async (req, res)=>{
    try{
        const validatedData = loginAdminSchema.parse(req.body);


        const admin = await adminRepository.findByEmail(validatedData.email);
        if(!admin){
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await admin.confirmPassword(validatedData.password);
        if (!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }


        const token = jwt.sign(
            {
                adminId: admin._id
            },
            process.env.JWT_SECRET, 
            {expiresIn: '7d'}
        );


        res.json({
            message: 'Login successful', 
            token, 
            admin: {
                id: admin._id, 
                fullName: admin.fullName, 
                email: admin.email, 
            }
        });
    } catch (error){
        if(error.errors){
            return res.status(400).json({
                message: 'Validation error', 
                errors: error.errors
            });
        }
        res.status(500).json({ message: 'Server error', error: error.message});
    }

};