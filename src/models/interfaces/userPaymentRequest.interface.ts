
interface IUserPaymentInfoRequest {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number;
  //usePoints: boolean;
}

export default IUserPaymentInfoRequest;