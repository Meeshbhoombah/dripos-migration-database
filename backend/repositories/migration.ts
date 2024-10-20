import { Request } from 'express';
import { ObjectId } from 'mongodb';

import { db } from '../services/mongoDb';


const collection = db.collection('migrations');


export enum Status {
    Failed = 'failed',
    Succeeded =  'succeeded'
}


export interface Insertion {
    status: Status,
    documentId?: ObjectId
}


export async function createMigration(req: Request, i: Insertion) {
    let migration: object = {};

    if (i.documentId) {
        migration = {
            name: req.body.type,
            status: i.status,
            created: req.body.created,
            impactedDocument: i.documentId.toHexString()
        }
    } 

    if (!i.documentId) {
        migration = {
            name: req.body.type,
            status: i.status,
            created: req.body.created 
        }    
    }

    await collection.insertOne(migration);
    return;
};

