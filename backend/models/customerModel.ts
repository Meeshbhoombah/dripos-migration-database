import mongoose, { Schema, Document } from 'mongoose';


interface ICustomer extends Document {
    name: string;
    email: string;
    stripeId: string;
    transactions: string[];
}


const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    stripeId: { type: String, required: true },
    transactions: [{type: String}],
});


export default mongoose.model<ICustomer>('Customer', CustomerSchema);


