import mongoose from 'mongoose';


export const dropDatabase = () => {
    mongoose.connection.dropDatabase(); 
}

