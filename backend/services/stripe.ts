import dotenv from 'dotenv';
import Stripe from 'stripe';


dotenv.config();

console.log('⏳ CREATING STRIPE CLIENT');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: '2024-06-20'});
console.log('✅ STRIPE CLIENT CREATED');

export { stripe };


interface customerPaymentsParams extends Stripe.PaginationParams, Stripe.PaymentIntentListParams {}

export const fetchCustomerPayments = async (stripeId: string) => {
    try {
        let paymentIds: string[] = [];

        let hasMore = true;
        let startingAfter = null;

        let request: customerPaymentsParams = {
            customer: stripeId,
            limit: 100 
        }

        while (hasMore) {
            let response: any = await stripe.paymentIntents.list(request);

            paymentIds = response.data.map((invoice: any) => invoice.id);

            hasMore = response.has_more;
            if (hasMore) {
                request.starting_after = response.data[response.data.length - 1].id; 
            }
        }

        return paymentIds;
    } catch (error) {
        console.error('Error fetching payments from Stripe:', error);
        throw error;
    }
};


interface customerInvoicesParams extends Stripe.PaginationParams, Stripe.InvoiceListParams {}

export const fetchCustomerInvoices = async (stripeId: string) => {
    try {
        let invoiceIds: string[] = [];

        let hasMore = true;
        let startingAfter = null;

        let request: customerInvoicesParams = {
            customer: stripeId,
            limit: 100 
        }

        while (hasMore) {
            let response: any = await stripe.invoices.list(request);
            invoiceIds = response.data.map((invoice: any) => invoice.id);

            hasMore = response.has_more;
            if (hasMore) {
                request.starting_after = response.data[response.data.length - 1].id; 
            }
        }

        return invoiceIds;
    } catch (error) {
        console.error('Error fetching invoices from Stripe:', error);
        throw error
    }
};


export async function createCustomer(
    params: Stripe.CustomerCreateParams
) {
    try {
        return await stripe.customers.create(params);
    } catch (error) {
        console.error("Failed to create Stripe customer: ", error);
        console.error("Params: ", params);
        throw error;
    }
}


export async function createPaymentMethod(
    customerId: string, 
    params: Stripe.CustomerCreateSourceParams
) {
    try {
        return await stripe.customers.createSource(customerId, params);
    } catch (error) {
        console.error("Failed to create Stripe customer source: ", error);
        console.error("Params: ", params);
        throw error;
    }
}


export async function createPayment(
    params: Stripe.PaymentIntentCreateParams
) {
    try {
        return await stripe.paymentIntents.create(params);
    } catch (error) {
        console.error("Failed to create Stripe payment: ", error);
        console.error("Params: ", params);
        throw error;
    }
}

