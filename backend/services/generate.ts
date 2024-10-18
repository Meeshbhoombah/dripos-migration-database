import dotenv from 'dotenv';

import Stripe from 'stripe';
import { faker } from '@faker-js/faker';

import { 
    createCustomer, 
    // createPaymentMethod, 
    // createPayment 
} from './stripe';


async function generateFalseCustomer() {
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let name = firstName + " " + lastName;

    let email = faker.internet.email({ firstName, lastName });
    email = email.toLowerCase();
    let phone = faker.phone.number();


    let params = {
        name,
        email,
        phone 
    }

    let customer = await createCustomer(params);
    return customer.id; 
}


export async function generate(numberOfCustomers: number) {
    for (let i = 0; i < numberOfCustomers; i++) {
        let customerId = await generateFalseCustomer();
        console.log(customerId);
        /*
        let cardId = await generateFalsePaymentMethod(customerId);
        
        let numberOfFalsePayments = randomNumberBetween(1, 3);
        for (let j = 0; j < numberOfFalsePayments; j++) {
            await generateFalsePayment();
        }
        */
    }
}


