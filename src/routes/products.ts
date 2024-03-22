import express from 'express';
import getProducts from '../controllers/productsController';
import Product from '../models/productModel';
import paginationHandler from '../middleware/paginationHandler';
const router = express.Router();


router.route("/").get(paginationHandler(Product),getProducts);

export default router;
