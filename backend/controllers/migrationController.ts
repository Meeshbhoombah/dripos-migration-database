import { Request, Response } from 'express';
import Customer from '../models/customerModel';
import { fetchCustomerPayments } from '../services/stripeService';
import { setCache, getCache } from '../services/redisCache';


export const migrateCustomerData = async (req: Request, res: Response) => {
    const { stripeId } = req.body;

    try {
        /*
        const cachedData = await getCache(stripeId);

        if (cachedData) {
            return res.status(200).json(cachedData);
        }
        */
       
        const payments = await fetchCustomerPayments(stripeId);
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            stripeId,
            transactions: payments.map((p: any) => p.id),
        });

        await customer.save();

        /*
        // TODO: update to use promise
        setCache(stripeId, customer);
        */
        
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Migration Failed'});
    }
};

