import pc from 'picocolors';
console.log(pc.blue(pc.bold("dripos-migration-database ----------")));


// DATABASE
import { load } from './services/mongoDb';
load();


// CACHE
import { connect } from './services/redis';
connect();


// SERVER
import express from 'express';
const app = express();

// Uses Express 4, for parsing Stripe data hitting `/webhook`
// app.use(express.raw({ type: 'application/json' }));
app.use(express.json());

import cors from 'cors';
app.use(cors());


// routes
import webhook from './routes/webhook';
app.use('/webhook', webhook);


// serve
import dotenv from 'dotenv';
dotenv.config();

console.log("⏳ STARTING SERVER");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ SERVER RUNNING ON PORT ${PORT}`));


// FALSE DATA GENERATION
import { generate } from './services/generate';
generate(parseInt(process.env.CUSTOMERS!));


// COMMAND
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
        default: {
            console.log("Command not found");
        }
    }

    process.stdin.resume();

});

