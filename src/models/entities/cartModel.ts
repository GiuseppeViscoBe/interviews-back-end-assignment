import mongoose, { Schema, Document } from 'mongoose';
import { ICart } from '../interfaces/cartInterface';
import Product from './productModel';

const cartSchema: Schema = new Schema({
    product: { type: Object, required: true }
});
  
  const Cart = mongoose.model<ICart>("Cart", cartSchema);
  
  export default Cart;
