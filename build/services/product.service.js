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
exports.getProductsByNameAndOrCategory = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../models/entities/productModel"));
const getAllProducts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skipIndex = (page - 1) * limit;
        const totalProducts = yield productModel_1.default.countDocuments().exec();
        const totalPages = Math.ceil(totalProducts / limit);
        const products = yield productModel_1.default.find().limit(limit).skip(skipIndex);
        return {
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllProducts = getAllProducts;
const getProductsByNameAndOrCategory = (productName, categoryName, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skipIndex = (page - 1) * limit;
        const totalProducts = yield productModel_1.default.countDocuments().exec();
        const totalPages = Math.ceil(totalProducts / limit);
        const products = yield productModel_1.default.find({
            name: { $regex: productName, $options: "i" },
            category: { $regex: categoryName, $options: "i" },
        })
            .limit(limit)
            .skip(skipIndex);
        return {
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getProductsByNameAndOrCategory = getProductsByNameAndOrCategory;
