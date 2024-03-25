"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const cart_model_1 = __importDefault(require("../models/entities/cart.model"));
const userPaymentInfo_1 = __importDefault(require("../models/entities/userPaymentInfo"));
const paymentUtils_1 = require("../utils/paymentUtils");
const constants_1 = require("../constants");
const product_model_1 = __importDefault(require("../models/entities/product.model"));
const placeOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPaymentInfo = yield userPaymentInfo_1.default.find();
        const cartItems = yield cart_model_1.default.aggregate([
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
        const userPaymentInfoRequest = {
            cardNumber: userPaymentInfo[0].cardNumber,
            expiryMonth: userPaymentInfo[0].expiryMonth,
            expiryYear: userPaymentInfo[0].expiryYear,
            cvv: userPaymentInfo[0].cvv,
            amount: cartItems[0].totalAmount,
        };
        const paymentResponse = yield (0, paymentUtils_1.processPayment)(userPaymentInfoRequest);
        // const paymentResponse: IPaymentResponse = {
        //     transactionId: "123456789", 
        //     status: "approved", 
        //     productUnavailable: [], 
        //   };
        if (paymentResponse.status === constants_1.PaymentStatus.APPROVED) {
            const productUnavailable = [];
            //Check if all items are available
            for (let item of cartItems[0].items) {
                const tmp = yield product_model_1.default.findById(item.id);
                if (tmp && tmp.quantity < item.quantity) {
                    productUnavailable.push({ id: item.id, isQuantityUnavailable: true });
                }
            }
            if (productUnavailable.length > 0) {
                return {
                    transactionId: paymentResponse.transactionId,
                    status: constants_1.PaymentStatus.APPROVED,
                    productUnavailable: productUnavailable,
                };
            }
            //If they are proceed 
            else {
                for (let item of cartItems[0].items) {
                    yield product_model_1.default.findByIdAndUpdate(item.id, {
                        $inc: { quantity: -item.quantity },
                    });
                }
                yield cart_model_1.default.deleteMany({});
            }
        }
        return paymentResponse;
    }
    catch (error) {
        throw error;
    }
});
exports.placeOrder = placeOrder;
