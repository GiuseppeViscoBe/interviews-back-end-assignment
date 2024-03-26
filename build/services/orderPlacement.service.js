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
const constants_1 = require("../constants");
const orderUtils_1 = require("../utils/orderUtils");
const placeOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userPaymentInfo = yield userPaymentInfo_1.default.findOne();
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
            cardNumber: (userPaymentInfo === null || userPaymentInfo === void 0 ? void 0 : userPaymentInfo.cardNumber) || '',
            expiryMonth: (userPaymentInfo === null || userPaymentInfo === void 0 ? void 0 : userPaymentInfo.expiryMonth) || '',
            expiryYear: (userPaymentInfo === null || userPaymentInfo === void 0 ? void 0 : userPaymentInfo.expiryYear) || '',
            cvv: (userPaymentInfo === null || userPaymentInfo === void 0 ? void 0 : userPaymentInfo.cvv) || '',
            amount: ((_a = cartItems[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0,
        };
        //const paymentResponse = await processPayment(userPaymentInfoRequest);
        // Mock Payment Response for testing
        const paymentResponse = {
            transactionId: "123456789",
            status: "approved",
            productUnavailable: [],
        };
        if (paymentResponse.status !== constants_1.PaymentStatus.APPROVED) {
            return paymentResponse;
        }
        const productUnavailable = yield (0, orderUtils_1.getUnavailableProducts)(cartItems[0].items);
        if (productUnavailable.length > 0) {
            return {
                transactionId: paymentResponse.transactionId,
                status: constants_1.PaymentStatus.APPROVED,
                productUnavailable,
            };
        }
        yield (0, orderUtils_1.updateProductsAndCart)(cartItems[0].items);
        return paymentResponse;
    }
    catch (error) {
        throw error;
    }
});
exports.placeOrder = placeOrder;
