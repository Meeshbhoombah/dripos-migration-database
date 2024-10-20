import { Status, Insertion } from './migration';
import { db } from '../services/mongoDb';


const collection = db.collection("customers");


export async function createCustomer(customer: object) {
    try {
        let document = await collection.insertOne(customer);
    
        let i: Insertion = {
            status: Status.Succeeded,
            documentId: document.insertedId
        }

        return i;
    } catch (e) {
        let i: Insertion = {
            status: Status.Failed
        }

        return i;
    }
}

