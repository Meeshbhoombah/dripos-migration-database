import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: '2024-06-20'});


export const fetchCustomerPayments = async (stripeId: string) => {
    try {
        const payments = await stripe.paymentIntents.list({ customer: stripeId });

        return payments.data;
    } catch (error) {
        console.error('Error fetching payments from Stripe:', error);
        throw error;
    }
};
