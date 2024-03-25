interface IPaymentResponse {
    transactionId: string;
    status: 'approved' | 'declined' | 'error';
    productUnavailable : {
        id : string,
        isQuantityUnavailable : boolean
    }[]
  }