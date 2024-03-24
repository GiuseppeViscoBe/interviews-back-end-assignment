import express from 'express';
import productsController from '../controllers/products.controller';
import Product from '../models/entities/productModel';
import paginationHandler from '../middleware/paginationHandler';

const router = express.Router();

router.get("/", paginationHandler(Product), productsController.getProducts);
router.get("/getProductsByNameAndOrCategory", productsController.getProductsByNameAndOrCategory ); 
router.get("/getCategoriesNameAndNumber", productsController.getCategoriesNameAndNumber)

export default router;
