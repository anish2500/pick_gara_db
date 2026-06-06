import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import placeRoutes from './src/routes/place.routes.js'; 
import roomRoutes from './src/routes/room.routes.js';
dotenv.config();


const PORT = process.env.PORT || 4000; 
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send("Hello World!");
});
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/places', placeRoutes); 
app.use('/api/rooms', roomRoutes); 
connectDB();
app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}` );
});

