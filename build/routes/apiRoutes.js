"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const orderPlacement_controller_1 = __importDefault(require("../controllers/orderPlacement.controller"));
const router = express_1.default.Router();
// Routes for products controller
router.get("/getAllProducts", products_controller_1.default.getAllProductsHandler);
router.get("/getProductsByNameAndOrCategory", products_controller_1.default.getProductsByNameAndOrCategoryHandler);
// Routes for categories controller
router.get("/getCategoriesNameAndNumber", categories_controller_1.default.getCategoriesNameAndNumberHandler);
//Routes for carte controller
router.post("/addProductsToCart", cart_controller_1.default.addProductsToCartHandler);
//Routes for order placement
router.post("/placeOrder", orderPlacement_controller_1.default.placeOrderHandler);
exports.default = router;
