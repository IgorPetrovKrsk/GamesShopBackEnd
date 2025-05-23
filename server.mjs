import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from "cors";
import globalErrorHandler from './middleware/globalErr.mjs';
import connectDB from './db/conn.mjs';
import userRoutes from './routes/userRoutes.mjs'
import gameRoutes from './routes/gameRoutes.mjs'
import cartRoutes from './routes/cartRoutes.mjs'



dotenv.config();
const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/cart', cartRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);    
});