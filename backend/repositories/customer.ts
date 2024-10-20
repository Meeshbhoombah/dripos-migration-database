import { ObjectId } from 'mongodb';

import { Status, DatabaseUpdate } from './migration';
import { db } from '../services/mongoDb';


const collection = db.collection("customers");


export async function createCustomer(customer: object) {

    try {
        let document = await collection.insertOne(customer);

        let u: DatabaseUpdate = {
            status: Status.Succeeded,
            documentId: document.insertedId.toHexString()
        }

        return u;
    } catch (e) {
        let u: DatabaseUpdate = {
            status: Status.Failed
        }

        return u;
    }

}


export async function updateCustomerByDocumentId(cusDocumentId: string, update: object) {

    try {
        let filter = {
            '_id' : new ObjectId(cusDocumentId)
        };

        let updateToMake = {
            $set: { ...update } 
        };

        let result = await collection.updateOne(filter, updateToMake);

        let u: DatabaseUpdate = {
            status: Status.Succeeded,
            documentId: cusDocumentId
        }

        return u;
    } catch (e) {
        let u: DatabaseUpdate = {
            status: Status.Failed, 
        }
        
        return u; 
    }

}


export async function updateCustomer(update: object) {

    try {
        let u: DatabaseUpdate = {
            status: Status.Succeeded, 
        }

        return update;
  
    } catch (e) {
        let u: DatabaseUpdate = {
            status: Status.Failed, 
        }

        return update;
    }

}

