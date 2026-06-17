import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load .env variables right here before configuring cloudinary
// This guarantees credentials are available no matter what order files load
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
