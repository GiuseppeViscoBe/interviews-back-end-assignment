import { Document } from 'mongoose';

interface IUserPaymentInfo extends Document {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number;
}

interface IUserInfo extends Document {
  userPaymentInfo: IUserPaymentInfo;
  earnedPoints: number;
}

export  {IUserPaymentInfo, IUserInfo};