import dotenv from 'dotenv';
import Stripe from 'stripe';
import { faker } from '@faker-js/faker';


dotenv.config();

console.log('⏳ CREATING STRIPE CLIENT');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: '2024-06-20'});
console.log('✅ STRIPE CLIENT CREATED');


faker.seed(420);


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


interface customerCreateParams extends Stripe.CustomerCreateParams {}

const createFalseCustomer = async () => {
    // Not using`faker.person.fullName()` because it adds prefixes
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    
    let email = faker.internet.email({ firstName, lastName });

    let request: customerCreateParams = {
        name: firstName + " " + lastName,
        email: email.toLowerCase(),
        phone: faker.phone.number()
    }

    let response: any = await stripe.customers.create(request);

    return response.id;
};


// https://docs.stripe.com/testing?testing-method=tokens#cards
const TEST_CARD_TOKENS = [
    "tok_visa",
    "tok_visa_debit",
    "tok_mastercard",
    "tok_mastercard_debit",
    "tok_amex"
];

const createFalsePaymentMethod = async (stripeId: string) => {
    let res = await stripe.customers.createSource(stripeId, {
        source: TEST_CARD_TOKENS[Math.floor(Math.random() * TEST_CARD_TOKENS.length)]
    });

    return res.id;
};


const createFalsePayment = async (stripeId: string, cardId: string) => {
    const paymentIntent = await stripe.paymentIntents.create({
        customer: stripeId,
        amount: 2000,
        currency: 'usd',
        payment_method: cardId,
        confirm: true,
        return_url: "https://2266-73-150-135-223.ngrok-free.app",
        automatic_payment_methods: {
            enabled: true,
        },
    });
}


// TODO: ignore first five customers sent to webhook so they can be added by 
// hand
// TODO: generate some payments and/or invoices above the 100s so that the
// above functions can be tested
export const generateFalseData = async (customerCount: number) => {
    for (let i = 0; i < customerCount; i++) {
        let stripeId = await createFalseCustomer();
        let cardId = await createFalsePaymentMethod(stripeId);
        await createFalsePayment(stripeId, cardId);
        // TODO: ? sleep the loop for an interval so that a webhook can pickup
        // generated customers and add it to the application -- can this occur
        // without sleeping the loop?
    }
};

