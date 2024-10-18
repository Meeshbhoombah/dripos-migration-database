import dotenv from 'dotenv';

import Stripe from 'stripe';
import { faker } from '@faker-js/faker';

import { 
    createCustomer, 
    createPaymentMethod, 
    createPayment 
} from './stripe';


dotenv.config();
faker.seed(420);


async function generateFalseCustomer() {
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let name = firstName + " " + lastName;

    let email = faker.internet.email({ firstName, lastName });
    email = email.toLowerCase();
    let phone = faker.phone.number();


    let params: Stripe.CustomerCreateParams = {
        name,
        email,
        phone 
    }

    let customer = await createCustomer(params);
    return customer.id; 
}


function randomValueFrom(arr: []) {
    return arr[Math.floor(Math.random() * arr.length)];
}


const TEST_CARD_TOKENS = [
    "tok_visa",
    "tok_visa_debit",
    "tok_mastercard",
    "tok_mastercard_debit",
    "tok_amex"
];

async function generateFalsePaymentMethod(stripeCustomerId: string) {
    let params: Stripe.CustomerCreateSourceParams = {
        source: randomValueFrom(TEST_CARD_TOKENS),
    } 

    let card = await createPaymentMethod(stripeCustomerId, params);
    return card.id;
}


const TEST_COFFEE_PRICES = [
    250,
    280,
    300, 
];

async function generateFalsePayment(stripeCustomerId: string, stripeCardId: string) {
    let params: Stripe.PaymentIntentCreateParams = {
        customer: stripeCustomerId,
        amount: randomValueFrom(TEST_COFFEE_PRICES),
        currency: 'usd',
        payment_method: stripeCardId,
        confirm: true,
        return_url: process.env.STRIPE_RETURN_URL,
        automatic_payment_methods: {
            enabled: true,
        }, 
    }

    let payment = await createPayment(params);
}


function randomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function generate(numberOfCustomers: number) {
    for (let i = 0; i < numberOfCustomers; i++) {
        let stripeCustomerId = await generateFalseCustomer();
        let stripeCardId = await generateFalsePaymentMethod(stripeCustomerId);
       
        let numberOfFalsePayments = randomNumberBetween(1, 3);

        for (let j = 0; j < numberOfFalsePayments; j++) {
            await generateFalsePayment(stripeCustomerId, stripeCardId);
        }
    }
}

