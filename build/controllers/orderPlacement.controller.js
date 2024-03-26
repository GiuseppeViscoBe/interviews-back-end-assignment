"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderPlacementService = __importStar(require("../services/orderPlacement.service"));
const constants_1 = require("../constants");
//@desc Place The Order
//@route POST/api/placeOrder
//@access public
const placeOrderHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usePoints = req.body.usePoints;
        const paymentResponse = yield orderPlacementService.placeOrder(usePoints);
        if (!paymentResponse) {
            res.status(400).json({ message: "The cart is empty" });
        }
        if ((paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.status) === constants_1.PaymentStatus.APPROVED) {
            if (!paymentResponse.productUnavailable ||
                paymentResponse.productUnavailable.length === 0) {
                res.status(200).json({ message: "The order was placed successfully" });
            }
            else {
                const unavailableItems = paymentResponse.productUnavailable.map((item) => item.id);
                res
                    .status(400)
                    .json({
                    message: "Some items quantity are not available",
                    unavailableItems,
                });
            }
        }
        else if ((paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.status) === constants_1.PaymentStatus.DECLINED) {
            return res
                .status(401)
                .json({ message: "The payment method was declined" });
        }
        else if ((paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.status) === constants_1.PaymentStatus.ERROR) {
            return res
                .status(500)
                .json({ message: "There was an unidentified error with the payment" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    placeOrderHandler,
};
