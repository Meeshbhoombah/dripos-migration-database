import { Request, Response } from 'express';
import Customer from '../models/customerModel';
import { fetchCustomerPayments } from '../services/stripeService';
import { setCache, getCache } from '../services/redisCache';


export const migrateCustomerData = async (req: Request, res: Response) => {
    const { stripeId } = req.body;

    try {
        const cachedData = await getCache(stripeId);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        const payments = await fetchCustomerPayments(stripeId);
        // const invoices = await fetchCustomerInvoices(stripeId);

        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            stripeId,
            transactions: payments.map((p) => p.id),
            // invoices: invoices.map((p: any) => )
        });

        await customer.save();

        setCache(stripeId, customer);
        
        res.status(201).json(customer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Migration Failed'});
    }
}

/*
export const migrateInvoiceData = async (req: Request, res: Response) => {
};
*/

