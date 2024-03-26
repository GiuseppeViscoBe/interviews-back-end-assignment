import mongoose, { Schema } from "mongoose";
import { IUserInfo } from "../interfaces/userInfo";

const userInfoSchema: Schema<IUserInfo> = new Schema<IUserInfo>({
    userPaymentInfo: { type: Schema.Types.ObjectId, ref: 'UserPaymentInfo', required: true },
    earnedPoints: { type: Number, required: true },
  });
  
  const UserInfo = mongoose.model<IUserInfo>('UserInfo', userInfoSchema, 'UserInfo');

  export default UserInfo