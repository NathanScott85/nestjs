import * as mongoose from 'mongoose';

// using the extends keyword to let typescript know that we are using @types/mongoose.
// without it we get errors  when using .save() which is a mongoose feature.
export interface IProduct extends mongoose.Document{
    id: string;
    title: string;
    description: string;
    price: number;
}