import Cart from "../models/entities/cart.model";
import UserInfo from "../models/entities/userInfo.model";
import IUserPaymentInfoRequest from "../models/interfaces/userPaymentRequest.interface";
import { IUserInfo } from "../models/interfaces/userInfo";
import { processPayment } from "../utils/paymentUtils";
import { PaymentStatus } from "../constants";
import Product from "../models/entities/product.model";
import {
  addUserPoints,
  calculateDiscountPointsEarned,
  getUnavailableProducts,
  manageDiscountPoints,
  updateProductsAndCart,
  updateUserPoints,
} from "../utils/orderUtils";

export const placeOrder = async (usePoints: boolean) => {
  try {
    const userInfo = await UserInfo.findOne();
    let totalAmountToPayAfterDiscount: number = 0;
    let remainingPoints: number = 0;
    let discountResult;
    const cartItems = await Cart.aggregate([
      {
        $project: {
          _id: "$product._id",
          totalPrice: {
            $round: [{ $multiply: ["$product.price", "$product.quantity"] }, 2],
          },
          quantity: "$product.quantity",
          extraPoints: "$product.extraPoints",
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
              extraPoints: "$extraPoints",
            },
          },
          totalAmount: { $sum: { $round: ["$totalPrice", 2] } },
          totalExtraPoints: { $sum: "$extraPoints" },
        },
      },
    ]);

    if (!cartItems || cartItems.length === 0 || !cartItems[0].items) {
      return null;
    }

    let totalAmountToPay = cartItems[0]?.totalAmount;

    if (usePoints) {
      discountResult = manageDiscountPoints(
        totalAmountToPay,
        userInfo?.earnedPoints
      );
      totalAmountToPayAfterDiscount =
        discountResult.totalAmountToPayAfterDiscount === undefined
          ? totalAmountToPay
          : discountResult.totalAmountToPayAfterDiscount;

      remainingPoints = discountResult.remainingPoints;
    }

    const userPaymentInfoRequest: IUserPaymentInfoRequest = {
      cardNumber: userInfo?.cardNumber || "",
      expiryMonth: userInfo?.expiryMonth || "",
      expiryYear: userInfo?.expiryYear || "",
      cvv: userInfo?.cvv || "",
      amount: usePoints ? totalAmountToPayAfterDiscount : totalAmountToPay,
    };
    //const paymentResponse = await processPayment(userPaymentInfoRequest);
    // Mock Payment Response for testing
    const paymentResponse: IPaymentResponse = {
      transactionId: "123456789",
      status: "approved",
      cartStatus: true,
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
    if (usePoints) {
      await updateUserPoints(remainingPoints);
      totalAmountToPay = totalAmountToPayAfterDiscount;
    }


    const earnedPoints = calculateDiscountPointsEarned(
      cartItems[0].items,
      totalAmountToPay
    );
    await addUserPoints(earnedPoints);

    return paymentResponse;
  } catch (error) {
    throw error;
  }
};
