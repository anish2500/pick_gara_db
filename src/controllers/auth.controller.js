import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
import userRepository from '../repositories/auth.repository.js';
export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    const existingUser = await userRepository.findByEmail(
      validatedData.email, 
      
    );
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }
    
    const user = await userRepository.create(validatedData);
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName, 
        email: user.email,
        profileImage: user.profileImage || null, 
    
      }
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    const user = await userRepository.findByEmail(validatedData.email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.confirmPassword(validatedData.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName, 
        email: user.email,
        profileImage: user.profileImage || null, 

       
      }
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getProfile = async (req, res) =>{
  try {
    const user = await userRepository.findById(req.userId); 


    if(!user){
      return res.status(404).json({ message: 'User not found'});

    }

    res.json({
      user: {
        id: user._id, 
        fullName: user.fullName, 
        email: user.email, 
        profileImage: user.profileImage || null, 
      },
    });
  } catch (error){
    res.status(500).json({ message: 'Server error', error: error.message});
  }
};



export const uploadAvatar = async(req, res)=>{
  try {
    if(!req.file){
      return res.status(400).json({ message: 'No image file provided'});
    }

    const localFilePath = req.file.path; 


    const cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
      folder: 'pick_gara/avatars', 
      transformation: [{ width: 300, height: 300, crop: 'fill'}], 

    });


    const user = await userRepository.updateById(req.userId, {
      profileImage: cloudinaryResult.secure_url, 
    }); 

    res.json({
      message: 'Profile image updated successfully', 
      profileImage: user.profileImage, 
      localPath: localFilePath, 
    });
  } catch (error){
    res.status(500).json({ message: 'Server error', error: error.message});
  }
};

