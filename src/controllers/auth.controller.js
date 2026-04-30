import jwt from 'jsonwebtoken';
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