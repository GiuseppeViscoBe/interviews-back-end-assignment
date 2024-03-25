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
exports.addProductToCart = void 0;
const productModel_1 = __importDefault(require("../models/entities/productModel"));
const cartModel_1 = __importDefault(require("../models/entities/cartModel"));
function addProductToCart(productId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield productModel_1.default.findById(productId);
            if (!product) {
                console.log("i am returning 404");
                return 404;
            }
            if (quantity > product.availableQuantity) {
                return 400;
            }
            const cartItem = new cartModel_1.default({
                product: product
            });
            yield cartItem.save();
            return null;
        }
        catch (error) {
            throw (error);
        }
    });
}
exports.addProductToCart = addProductToCart;
