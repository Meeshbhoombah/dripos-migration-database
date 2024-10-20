import { db } from '../services/mongoDb';


const collection = db.collection('migrations');


export enum Status {
    Failed,
    Succeeded
}

