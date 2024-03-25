
import mongoose, { Schema, Model, Document } from 'mongoose';
import IUserPaymentInfo from '../interfaces/userPaymentInfo';

const userPaymentInfoSchema : Schema<IUserPaymentInfo> = new Schema<IUserPaymentInfo>({
  cardNumber: { type: String, required: true },
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: Number, required: true },
});

const UserPaymentInfo = mongoose.model<IUserPaymentInfo>('UserPaymentInfo', userPaymentInfoSchema, 'UserPaymentInfo');

export default UserPaymentInfo;