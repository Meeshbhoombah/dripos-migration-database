import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: '2024-06-20'});


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

// TODO: ignore first five customers sent to webhook so they can be added by 
// hand
// TODO: generate some payments and/or invoices above the 100s so that the
// above functions can be tested

export const generateFalseData = (customerCount: 25, withInvoices: true) => {
    for (let i = 0; i < customerCount; i ++) {
        let paymentMethodId = "";

        // We want five customer's payment methods to be able to make sucessful
        // payments to simulate transactions
        if (i <= 20) {
            paymentMethodId = generateFalsePaymentMethod();
        } else {
            let withSuccessfulPayments = true;
            paymentMethodId = generateFalsePaymentMethod(withSuccessfulPayments);
        }

        generateFalseCustomer(paymentMethodId);

        // TODO: ? sleep the loop for an interval so that a webhook can pickup
        // generated customers and add it to the application -- can this occur
        // without sleeping the loop?
    }
};

