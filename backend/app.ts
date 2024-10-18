import pc from 'picocolors';
console.log(pc.blue(pc.bold("dripos-migration-database ----------")));


// -- DATABASE --
import { load } from './services/mongoDb';
load();


// -- CACHE --
import { connect } from './services/redis';
connect();


// -- SERVER --
import express from 'express';
const app = express();

app.use(express.json());

import cors from 'cors';
app.use(cors());


import webhook from './routes/webhook';
app.use('/webhook', webhook);


import dotenv from 'dotenv';
dotenv.config();

console.log("⏳ STARTING SERVER");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ SERVER RUNNING ON PORT ${PORT}`));


// -- FALSE DATA GENERATION --
const CUSTOMERS = 1;

import { generate } from './services/generate';
generate(CUSTOMERS);

/*
import { generateFalseData } from './services/stripe';
generateFalseData(CUSTOMERS);
*/


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
        default: {
            console.log("Command not found");
        }
    }

    process.stdin.resume();
});

