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
const productModel_1 = __importDefault(require("../models/entities/productModel"));
//@desc Get all products
//@route GET/api/products
//@access public
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const totalProducts = yield productModel_1.default.countDocuments().exec();
        const totalPages = Math.ceil(totalProducts / limit);
        const products = yield productModel_1.default.find().limit(limit).skip(skipIndex);
        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found in the database" });
        }
        res.status(200).json({
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//@desc Get products by name and/or category
//@route GET/api/products
//@access public
const getProductsByNameAndOrCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productName = req.query.pName || "";
        const categoryName = req.query.cName || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const totalProducts = yield productModel_1.default.countDocuments().exec();
        const totalPages = Math.ceil(totalProducts / limit);
        const products = yield productModel_1.default.find({
            name: { $regex: productName, $options: "i" },
            category: { $regex: categoryName, $options: "i" },
        }).limit(limit).skip(skipIndex);
        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found with this name" });
        }
        res.status(200).json({
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//@desc Get categories name and number of products per category
//@route GET/api/products
//@access public
const getCategoriesNameAndNumber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriesWithProductCount = yield productModel_1.default.aggregate([
            {
                $group: {
                    _id: "$category",
                    productCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    categoryName: "$_id",
                    productCount: 1,
                    _id: 0,
                },
            },
        ]);
        if (categoriesWithProductCount.length === 0) {
            return res
                .status(404)
                .json({ message: "No categories found in the database" });
        }
        res.status(200).json(categoriesWithProductCount);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    getProducts,
    getProductsByNameAndOrCategory,
    getCategoriesNameAndNumber,
};
