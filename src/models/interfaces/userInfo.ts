import { Document } from 'mongoose';

interface IUserInfo extends Document {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number;
  earnedPoints: number;
}


export  {IUserInfo};