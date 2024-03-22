"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = __importDefault(require("../controllers/productsController"));
const productModel_1 = __importDefault(require("../models/productModel"));
const paginationHandler_1 = __importDefault(require("../middleware/paginationHandler"));
const router = express_1.default.Router();
router.route("/").get((0, paginationHandler_1.default)(productModel_1.default), productsController_1.default);
exports.default = router;
