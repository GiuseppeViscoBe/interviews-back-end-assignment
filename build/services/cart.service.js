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
exports.getCart = exports.addProductToCart = void 0;
const product_model_1 = __importDefault(require("../models/entities/product.model"));
const cart_model_1 = __importDefault(require("../models/entities/cart.model"));
const mongoose_1 = require("mongoose");
const addProductToCart = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            return { product: null };
        }
        const existingCartItem = yield cart_model_1.default.findOne({ "product._id": new mongoose_1.Types.ObjectId(productId) });
        if (existingCartItem) {
            const updatedCartItem = yield cart_model_1.default.updateOne({ "product._id": new mongoose_1.Types.ObjectId(productId) }, { $inc: { "product.quantity": quantity } });
            return { product };
        }
        product.quantity = quantity;
        const cartItem = new cart_model_1.default({ product });
        yield cartItem.save();
        return { product };
    }
    catch (error) {
        throw error;
    }
});
exports.addProductToCart = addProductToCart;
const getCart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_model_1.default.find();
        if (!cart) {
            return null;
        }
        return cart;
    }
    catch (error) {
        throw error;
    }
});
exports.getCart = getCart;
