import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


dotenv.config();

let mongodbUri = 'mongodb://' + process.env.MONGO_HOSTNAME + ':27017' + '/dripos_migration';
let mongodb = new MongoClient(mongodbUri);
let db = mongodb.db();

export { db };


export async function load() {
    console.log("⏳ CONNECTING TO MONGODB");
    await mongodb.connect()
    console.log("✅ CONNECTED TO MONGODB");

    db.createCollection('customers');
    db.createCollection('migrations');
};


export function dropDatabase() {
    db.dropDatabase();
};

