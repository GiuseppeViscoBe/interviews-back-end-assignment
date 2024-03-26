
interface IUserPaymentInfoRequest {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number;
}

export default IUserPaymentInfoRequest;