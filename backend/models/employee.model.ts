import mongoose, { Schema, Document } from 'mongoose';


interface IEmployee extends Document {
    full_name: string;
    first_name?: string;
    last_name?: string;
}


const EmployeeSchema: Schema = new Schema({
    full_name: { type: String, required true },
    first_name: { type: String },
    last_name: { type: String }
});


export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

