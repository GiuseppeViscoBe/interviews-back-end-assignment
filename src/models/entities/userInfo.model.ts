
import mongoose, { Schema, Model, Document } from 'mongoose';
import {IUserInfo} from '../interfaces/userInfo';

const userInfoSchema : Schema<IUserInfo> = new Schema<IUserInfo>({
  cardNumber: { type: String, required: true },
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: Number, required: true },
  earnedPoints: { type: Number, required: true }
});

const UserInfo = mongoose.model<IUserInfo>('UserInfo', userInfoSchema, 'UserInfo');

export default UserInfo;