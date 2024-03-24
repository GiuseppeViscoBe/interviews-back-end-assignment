import express from 'express';
import getProducts from '../controllers/products.controller';
import Product from '../models/entities/productModel';
import paginationHandler from '../middleware/paginationHandler';
const router = express.Router();


router.route("/").get(paginationHandler(Product),getProducts);

export default router;
