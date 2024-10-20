/**
 * 
 * `controllers/webhook`
 *
 * To track migrations of data from Stripe to `dripos-migration-database`'s
 * MongoDB instance, we retain all information from events sent to the 
 * `/webhook` endpoint.
 *
 * To enable this, the `customers` collection's repository returns a 
 * `DatabaseUpdate` type for each of its CRUD operations, which we define, 
 * within this controller, as `databaseUpdate`. This contains the requied 
 * database operation metadata to document a migration.
 *
 */

import pc from 'picocolors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Stripe from 'stripe';

import { oset, oget } from '../services/redis';
import { 
    Status, 
    DatabaseUpdate,
    createMigration 
} from '../repositories/migration';
import { 
    createCustomer,

    updateCustomer,
    updateCustomerByDocumentId,

    /*
    addSource,
    updateSource,
    deleteSource,

    addPayment
    */
} from '../repositories/customer';


export async function handle(req: Request, res: Response) {
    let event = req.body.type;

    console.log(event);

    switch (event) {
        case 'customer.created': {
            // Stripe's webhook requests store the event data behind the series
            // of objects: `body.data.object`
            let cus = req.body.data.object;

            let databaseUpdate = await createCustomer(cus);

            await createMigration(req, databaseUpdate);

            // Cache the `dripos-migration-database` Customer Document ID 
            // as a value to Stripe's Customer ID, so subsequent requests can 
            // be more optimal by avoiding commanding the database
            oset(cus.id, databaseUpdate.documentId);

            break;
        }
        case 'customer.updated': {
            let cus = req.body.data.object;

            // If a previous request has recently created the customer, we can
            // avoid a command to the database by retriving it from the Cache
            let cusDocumentId = await oget(cus.id);

            let databaseUpdate: DatabaseUpdate = {};
            if (cusDocumentId) {
                databaseUpdate = await updateCustomerByDocumentId(cusDocumentId, cus);
            }

            if (!cusDocumentId) {
                databaseUpdate = await updateCustomer(cus);
            }

            await createMigration(req, databaseUpdate);

            oset(cus.id, databaseUpdate.documentId);

            break;
        }
        case 'payment_method.attached': {
            break; 
        }
        case 'payment_intent.succeeded': {
            break;
        }
        default: {
            console.log('Unlandled event type: ', event) 
        } 
    }
        
    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
};

