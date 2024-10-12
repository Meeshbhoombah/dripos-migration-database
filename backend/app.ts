import os from 'os';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import migrationRoutes from './routes/migrationRoutes';
import cleanRoutes from './routes/cleanRoutes';


dotenv.config();


mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/migrate', migrationRoutes);
app.use('/clean', cleanRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

