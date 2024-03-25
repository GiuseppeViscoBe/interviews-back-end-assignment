import Cart from "../models/entities/cart.model";
import UserPaymentInfo from "../models/entities/userPaymentInfo";
import IUserPaymentInfoRequest from "../models/interfaces/userPaymentRequest.interface";
import IUserPaymentInfo from "../models/interfaces/userPaymentInfo";
import { processPayment } from "../utils/paymentUtils";
import { PaymentStatus } from "../constants";
import Product from "../models/entities/product.model";
import { getUnavailableProducts, updateProductsAndCart } from "../utils/orderUtils";

export const placeOrder = async () => {
    try {
      const userPaymentInfo = await UserPaymentInfo.findOne();
  
      const cartItems = await Cart.aggregate([
        {
          $project: {
            _id: "$product._id",
            totalPrice: { $multiply: ["$product.price", "$product.quantity"] },
            quantity: "$product.quantity",
          },
        },
        {
          $group: {
            _id: null,
            items: {
              $push: {
                id: "$_id",
                total: "$totalPrice",
                quantity: "$quantity",
              },
            },
            totalAmount: { $sum: "$totalPrice" },
          },
        },
      ]);
  
      const userPaymentInfoRequest: IUserPaymentInfoRequest = {
        cardNumber: userPaymentInfo?.cardNumber || '',
        expiryMonth: userPaymentInfo?.expiryMonth || '',
        expiryYear: userPaymentInfo?.expiryYear || '',
        cvv: userPaymentInfo?.cvv || '',
        amount: cartItems[0]?.totalAmount || 0,
      };
  

       //const paymentResponse = await processPayment(userPaymentInfoRequest);
      // Mock Payment Response for testing
      const paymentResponse: IPaymentResponse = {
        transactionId: "123456789",
        status: "approved",
        productUnavailable: [],
      };
  
      if (paymentResponse.status !== PaymentStatus.APPROVED) {
        return paymentResponse;
      }
  
      const productUnavailable = await getUnavailableProducts(cartItems[0].items);
  
      if (productUnavailable.length > 0) {
        return {
          transactionId: paymentResponse.transactionId,
          status: PaymentStatus.APPROVED,
          productUnavailable,
        };
      }
  
      await updateProductsAndCart(cartItems[0].items);
      return paymentResponse;
    } catch (error) {
      throw error;
    }
  };
