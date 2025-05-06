import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from "cors";
import globalErrorHandler from './middleware/globalErr.mjs';
import connectDB from './db/conn.mjs';



dotenv.config();
const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());




app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);    
});