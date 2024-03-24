"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const productModel_1 = __importDefault(require("../models/entities/productModel"));
const paginationHandler_1 = __importDefault(require("../middleware/paginationHandler"));
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
const router = express_1.default.Router();
// Routes for products controller
router.get("/getProducts", (0, paginationHandler_1.default)(productModel_1.default), products_controller_1.default.getProducts);
router.get("/getProductsByNameAndOrCategory", products_controller_1.default.getProductsByNameAndOrCategory);
// Routes for categories controller
router.get("/getCategoriesNameAndNumber", categories_controller_1.default.getCategoriesNameAndNumber);
exports.default = router;
