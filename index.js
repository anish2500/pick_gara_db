import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
dotenv.config();


const PORT = process.env.PORT || 4000; 
const app = express();

app.use(express.json());


app.get('/', (req, res)=>{
    res.send("Hello World!");
});
app.use('/api/auth', authRoutes);
connectDB();
app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}` );
});

