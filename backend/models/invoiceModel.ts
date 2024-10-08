import mongoose, { Schema, Document } from 'mongoose';


interface IInvoice extends Document {
    stripeInvoiceId: string;
    customer: string;
    total: number;
    created: number;
    status: string;
}


const InvoiceSchema: Schema = new Schema({
    stripeInvoiceId: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    total: { type: Number, required: true },
    created: { type: Number, required: true },
    status: { type: String, required: true }
});


export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);

