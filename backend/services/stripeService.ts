import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: '2020-08-27'});


export const fetchCustomerPayments = async (stripeId: string) => {
    try {
        const payments = await stripe.pamentIntents.list({ customer: stripeId });
        return payments.data;
    } catch (error) {
        console.error('Error fetching payments from Stripe:', error);
        throw error;
    }
};
