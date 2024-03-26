import mongoose, { Schema, Document } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';
import Product from './product.model';

const cartSchema: Schema<ICart> = new Schema({
    product: { type: Object, required: true }
});
  
  const Cart = mongoose.model<ICart>("Cart", cartSchema, "Cart");
  
  export default Cart;
