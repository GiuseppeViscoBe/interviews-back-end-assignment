import { Request, Response, NextFunction } from "express";
import * as orderPlacementService from "../services/orderPlacement.service";
import { PaymentStatus } from "../constants";

//@desc Place The Order
//@route POST/api/placeOrder
//@access public
const placeOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentResponse = await orderPlacementService.placeOrder();

    if (paymentResponse.status === PaymentStatus.APPROVED) {
      // Se il pagamento è approvato e non ci sono elementi non disponibili
      if (!paymentResponse.productUnavailable || paymentResponse.productUnavailable.length === 0) {
        res.status(200).json({ message: "The order was placed successfully" });
      } else {
        // Se ci sono elementi non disponibili, restituisci un messaggio con gli elementi non disponibili
        const unavailableItems = paymentResponse.productUnavailable.map(item => item.id);
        res.status(400).json({ message: "Some items quantity are not available", unavailableItems });
      }
    } else if (paymentResponse.status === PaymentStatus.DECLINED) {
      return res.status(401).json({ message: "The payment method was declined" });
    } else if (paymentResponse.status === PaymentStatus.ERROR) {
      return res.status(500).json({ message: "There was an unidentified error with the payment" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  placeOrderHandler
};
