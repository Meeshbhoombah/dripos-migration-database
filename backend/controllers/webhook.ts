import pc from 'picocolors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Stripe from 'stripe';

import { stripe } from '../services/stripe';
import { 
    Status, 
    createMigration 
} from '../repositories/migration';
import { 
    createCustomer, 
    /*
    updateCustomer,

    addSource,
    updateSource,
    deleteSource,

    addPayment
    */
} from '../repositories/customer';


export async function handle(req: Request, res: Response) {
    let event = req.body.type;

    switch (event) {
        case 'customer.created': {
            let cus = req.body.data.object;

            let insertion = await createCustomer(cus);
            await createMigration(req, insertion);

            setCache(cus.id, insertion.documentId);

            break;
        }
        case 'customer.updated': {
            /*
            // Check and get customer if its id is in our Redis cache, if not 
            // use the event's data
            let cus = req.body.data.object;
            let cusDocumentId = await getCache(cuss.id);

            let m: Migration;
            if (cusDocumentId) {
                m = await updateCustomer(cusDocumentId, cus);
            }

            if (!customerId) {
                m = await updateCustomer(cus);
            }

            await createMigration(m);

            setCache(cus, m.documentId);

            break;
            */
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

