interface IPaymentResponse {
    transactionId: string;
    status: 'approved' | 'declined' | 'error';
  }