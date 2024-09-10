import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import migrationRoutes from './routes/migrationRoutes';


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI as string, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));


app.use('/api/migrate', migrationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on port &{PORT}'));

