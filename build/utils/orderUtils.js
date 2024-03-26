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
exports.updateProductsAndCart = exports.getUnavailableProducts = void 0;
const product_model_1 = __importDefault(require("../models/entities/product.model"));
const cart_model_1 = __importDefault(require("../models/entities/cart.model"));
const getUnavailableProducts = (cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productUnavailable = [];
        for (let item of cartItems) {
            const product = yield product_model_1.default.findById(item.id);
            if (product && product.quantity < item.quantity) {
                productUnavailable.push({ id: item.id, isQuantityUnavailable: true });
            }
        }
        return productUnavailable;
    }
    catch (error) {
        throw error;
    }
});
exports.getUnavailableProducts = getUnavailableProducts;
const updateProductsAndCart = (cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let item of cartItems) {
            yield product_model_1.default.findByIdAndUpdate(item.id, {
                $inc: { quantity: -item.quantity },
            });
        }
        yield cart_model_1.default.deleteMany({});
    }
    catch (error) {
        throw error;
    }
});
exports.updateProductsAndCart = updateProductsAndCart;
