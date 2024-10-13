import os from 'os';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import migrationRoutes from './routes/migrationRoutes';
import cleanRoutes from './routes/cleanRoutes';

import { generateFalseData } from './services/stripeService';


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


const CUSTOMERS_TO_GENERATE = 1;

generateFalseData(CUSTOMERS_TO_GENERATE);


process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
    let chunk = process.stdin.read() as string;
    let lines = chunk.split(os.EOL);
    let command = lines[0];
    let commandParts = command.split("");
    let commandName = commandParts[0];
    let commandParams = commandParts.slice(1);

    switch (commandName) {
        default: {
            console.log("Command not found");
        }
    }
});

