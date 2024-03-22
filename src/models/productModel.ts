import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  availableQuantity: number;
  category: string;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  category: { type: String, required: true }
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
