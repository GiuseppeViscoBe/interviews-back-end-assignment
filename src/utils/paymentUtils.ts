import axios from 'axios';
import dotenv from 'dotenv'
import IUserPaymentInfoRequest from '../models/interfaces/userPaymentRequest.interface';


dotenv.config();

export const processPayment = async (paymentRequest: IUserPaymentInfoRequest) : Promise<IPaymentResponse> => {
    try {
      const paymentEndpoint: string = process.env.PAYMENT_SERVICE_ENDPOINT!;
      const response = await axios.post(paymentEndpoint, paymentRequest);
      return response.data;
    } catch (error) {
      throw error
    }
  };