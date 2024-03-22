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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//@desc Get all products
//@route GET/api/products
//@access public
const getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const products = (_b = (_a = res.paginatedResult) === null || _a === void 0 ? void 0 : _a.results) !== null && _b !== void 0 ? _b : [];
    const next = (_c = res.paginatedResult) === null || _c === void 0 ? void 0 : _c.next;
    const previous = (_d = res.paginatedResult) === null || _d === void 0 ? void 0 : _d.previous;
    if (products.length == 0) {
        res.status(404);
        throw new Error("No products available in the database.");
    }
    res.status(200).json({
        next,
        previous,
        products
    });
}));
exports.default = getProducts;
