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
const userInfo_model_1 = __importDefault(require("../models/entities/userInfo.model"));
const constants_1 = require("../constants");
const orderUtils_1 = require("../utils/orderUtils");
const placeOrder = (usePoints) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userInfo = yield userInfo_model_1.default.findOne();
        let totalAmountToPayAfterDiscount = 0;
        let remainingPoints = 0;
        let discountResult;
        const cartItems = yield cart_model_1.default.aggregate([
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
        let totalAmountToPay = (_a = cartItems[0]) === null || _a === void 0 ? void 0 : _a.totalAmount;
        if (usePoints) {
            discountResult = (0, orderUtils_1.manageDiscountPoints)(totalAmountToPay, userInfo === null || userInfo === void 0 ? void 0 : userInfo.earnedPoints);
            totalAmountToPayAfterDiscount =
                discountResult.totalAmountToPayAfterDiscount === undefined
                    ? totalAmountToPay
                    : discountResult.totalAmountToPayAfterDiscount;
            remainingPoints = discountResult.remainingPoints;
        }
        const userPaymentInfoRequest = {
            cardNumber: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.cardNumber) || "",
            expiryMonth: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.expiryMonth) || "",
            expiryYear: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.expiryYear) || "",
            cvv: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.cvv) || "",
            amount: usePoints ? totalAmountToPayAfterDiscount : totalAmountToPay,
        };
        //const paymentResponse = await processPayment(userPaymentInfoRequest);
        // Mock Payment Response for testing
        const paymentResponse = {
            transactionId: "123456789",
            status: "approved",
            cartStatus: true,
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
        if (usePoints) {
            yield (0, orderUtils_1.updateUserPoints)(remainingPoints);
            totalAmountToPay = totalAmountToPayAfterDiscount;
        }
        const earnedPoints = (0, orderUtils_1.calculateDiscountPointsEarned)(cartItems[0].items, totalAmountToPay);
        yield (0, orderUtils_1.addUserPoints)(earnedPoints);
        return paymentResponse;
    }
    catch (error) {
        throw error;
    }
});
exports.placeOrder = placeOrder;
