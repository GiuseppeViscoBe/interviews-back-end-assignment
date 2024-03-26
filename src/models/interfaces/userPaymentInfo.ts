import { Document } from 'mongoose';

interface IUserPaymentInfo extends Document {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number;
}

export default IUserPaymentInfo;