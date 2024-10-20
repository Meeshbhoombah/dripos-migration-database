import { Status } from './migration';
import { db } from '../services/mongoDb';


const collection = db.collection("customers");


export async function createCustomer(customer: object) {
    try {
        await collection.insertOne(customer);
        return Status.Succeeded;
    } catch (e) {
        return Status.Failed;
    }
}

