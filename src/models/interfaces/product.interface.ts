interface IProduct extends Document {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  extraPoints : number
}
