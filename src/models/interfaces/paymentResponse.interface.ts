interface IPaymentResponse {
    transactionId: string;
    status: 'approved' | 'declined' | 'error';
    cartStatus : boolean;
    productUnavailable : {
        id : string,
        isQuantityUnavailable : boolean
    }[]
  }