interface IProduct extends Document {
  _id: string;
  name: string;
  image: string;
  price: number;
  availableQuantity: number;
  category: string;
}
