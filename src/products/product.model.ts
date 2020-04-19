import * as mongoose from 'mongoose';

export const  ProductSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  description: { type: String, required: true },
  price:  { type: String, required: true }
});
// using the extends keyword to let typescript know that we are using @types/mongoose.
// without it we get errors  when using .save() which is a mongoose feature.
export interface Product extends mongoose.Document{
     id: string;
     title: string;
     description: string;
     price: number;
}
