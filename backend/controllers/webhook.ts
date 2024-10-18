import { Request, Response } from 'express';
// import { createMigration } from 'repositories/migration';
/*
import { 
    createCustomer, 
    updateCustomer,

    addSource,
    updateSource,
    deleteSource,

    addPayment
} from 'repositories/customer';
*/

export async function handle(req: Request, res: Response) {
    let event = req.body;

    switch (event.type) {
        // Because `dripos-migration-database` stores data permanetly, we do 
        // not need to respond to deletion events other than to demarcate that
        // said event deletes some data (e.g: source deletion events)
        case 'customer.created': {
        
        }
        case 'customer.updated': {
            /*
            // Check and get customer if its id is in our Redis cache, if not 
            // use the event's data
            let customer = await getCache(data.id);
            if (!customer) {
                customer = event.data.object;
            }

            // Migrate the updated customer data to our Mongo DB database 
            let status = await updateCustomer(customer);

            // Log migration event to our Mongo DB database, whether a success 
            // or failure
            await createMigration(status, event);

            setCache(customer.id, customer);
            */
        }
        case 'customer.source.created': {
        
        }
        case 'customer.source.updated': {
        
        }
        case 'customer.source.deleted': {
        
        }
        case 'payment_intent.succeeded': {
        
        }
        default: {
            console.log('Unlandled event type: ', event) 
        } 
    }
        
    // Return a 200 response to acknowledge receipt of the event
    res.send(200);
}

