import express from 'express';
import productsController from '../controllers/products.controller';
import Product from '../models/entities/productModel';
import paginationHandler from '../middleware/paginationHandler';
import categoriesController from '../controllers/categories.controller';

const router = express.Router();

// Routes for products controller
router.get("/getProducts", paginationHandler(Product), productsController.getProducts);
router.get("/getProductsByNameAndOrCategory", productsController.getProductsByNameAndOrCategory ); 


// Routes for categories controller
router.get("/getCategoriesNameAndNumber", categoriesController.getCategoriesNameAndNumber)

export default router;
