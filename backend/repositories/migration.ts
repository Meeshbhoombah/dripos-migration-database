import { Request } from 'express';
import { ObjectId } from 'mongodb';

import { db } from '../services/mongoDb';


const collection = db.collection('migrations');


export enum Status {
    Failed = 'failed',
    Succeeded =  'succeeded'
}


export interface DatabaseUpdate {
    status?: Status,
    documentId?: string
}


export async function createMigration(req: Request, u: DatabaseUpdate) {

    let migration: object = {};

    if (u.documentId) {
        migration = {
            name: req.body.type,
            status: u.status,
            created: req.body.created,
            impactedDocument: u.documentId.toString()
        }
    } 

    if (!u.documentId) {
        migration = {
            name: req.body.type,
            status: u.status,
            created: req.body.created 
        }    
    }

    await collection.insertOne(migration);
    return;

};

