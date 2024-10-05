import mongoose, { Schema, Document } from 'mongoose';


interface IPayroll extends Document {
    employee_id: mongoose.Types.ObjectId;
    salary: number;
    tax_code: string;
    last_payment_date: Date;
}


const PayrollSchema: Schema = new Schema({
    employee_id: { type: mongoose.Types.ObjectId, ref: 'Employee', required: true },
    salary: { type: Number, required: true },
    tax_code: { type: String, required: true},
    last_payment_date: { type: Date, default: Date.now },
});


export const Payroll = mongoose.model<IPayroll>('Payroll', PayrollSchema);

