import pc from 'picocolors';
console.log(pc.blue(pc.bold("dripos-migration-database ----------")));


import dotenv from 'dotenv';
dotenv.config();


// -- DATABASE --
console.log("⏳ CONNECTING TO MONGO DB DATABASE");

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("✅ CONNECTED TO MONGO DB DATABASE:");
        console.log(pc.magenta(process.env.MONGO_URI));
    })
    .catch((error) => { 
        console.error("🛑 Error connecting to MongoDB:", error)
    });


// -- SERVER --
import express from 'express';
const app = express();

app.use(express.json());

import cors from 'cors';
app.use(cors());

import webhookRoutes from './routes/webhookRoutes';
import migrationRoutes from './routes/migrationRoutes';
import cleanRoutes from './routes/cleanRoutes';

app.use('/webhook', webhookRoutes);
app.use('/api/migrate', migrationRoutes);
app.use('/clean', cleanRoutes);

console.log("⏳ STARTING SERVER");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ SERVER RUNNING ON PORT ${PORT}`));


// -- FALSE DATA GENERATION --
const CUSTOMERS = 0;

import { generateFalseData } from './services/stripeService';
generateFalseData(CUSTOMERS);


// -- COMMAND --
import os from 'os';

process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
    let chunk = process.stdin.read() as string;
    let lines = chunk.split(os.EOL);

    let command = lines[0];
    let commandParts = command.split(" ");
    let commandName = commandParts[0];
    let commandParams = commandParts.slice(1);

    switch (commandName) {
        case '':

        default: {
            console.log("Command not found");
        }
    }

    process.stdin.resume();
});

