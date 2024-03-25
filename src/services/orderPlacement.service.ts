
import Cart from "../models/entities/cart.model";
import UserPaymentInfo from "../models/entities/userPaymentInfo";
import IUserPaymentInfoRequest from "../models/interfaces/userPaymentRequest.interface";
import IUserPaymentInfo from "../models/interfaces/userPaymentInfo";
import { processPayment } from "../utils/paymentUtils";
import { PaymentStatus } from "../constants";
import Product from "../models/entities/product.model";

export const placeOrder = async() => {
  try {
    const userPaymentInfo = await UserPaymentInfo.find()


    const cartItems = await Cart.aggregate([
        {
          $project: {
            _id: "$product._id",
            totalPrice: { $multiply: ["$product.price", "$product.quantity"] },
            quantity: "$product.quantity"
          }
        },
        {
          $group: {
            _id: null,
            items: {
              $push: {
                id: "$_id",
                total: "$totalPrice",
                quantity: "$quantity"
              }
            },
            totalAmount: { $sum: "$totalPrice" }
          }
        }
      ]);


    const userPaymentInfoRequest: IUserPaymentInfoRequest = {
        cardNumber: userPaymentInfo[0].cardNumber,
        expiryMonth: userPaymentInfo[0].expiryMonth,
        expiryYear: userPaymentInfo[0].expiryYear,
        cvv: userPaymentInfo[0].cvv,
        amount: cartItems[0].totalAmount
      };
      
     const paymentResponse = await processPayment(userPaymentInfoRequest);

     if(paymentResponse.status === PaymentStatus.APPROVED){
        for (let item of cartItems[0].items) {
            await Product.findByIdAndUpdate(item.id, {
              $inc: { quantity: -item.quantity } 
            });
          }
        await Cart.deleteMany({});
        
    }


    return paymentResponse

  } catch (error) {
    throw error;
  }
}