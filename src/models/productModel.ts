import mongoose, { Schema, Document } from "mongoose";

// Definizione dell'interfaccia per il documento del prodotto
interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  availableQuantity: number;
  category: string;
}

// Schema del prodotto
const productSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  category: { type: String, required: true }
});

// Creazione del modello Product basato sullo schema
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
