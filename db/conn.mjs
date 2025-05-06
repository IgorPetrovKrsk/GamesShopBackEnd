import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = process.env.MONGOURI || '';

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected.');
        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;