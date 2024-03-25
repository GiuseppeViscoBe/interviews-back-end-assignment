import mongoose, { Schema, Document, Model, Query } from "mongoose";

const productSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true }
});

const Product = mongoose.model<IProduct>("Product", productSchema, 'Product');

export default Product;
