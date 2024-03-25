import express from 'express';
import productsController from '../controllers/products.controller';
import Product from '../models/entities/productModel';
import paginationHandler from '../middleware/paginationHandler';
import categoriesController from '../controllers/categories.controller';
import cartController from '../controllers/cart.controller';

const router = express.Router();

// Routes for products controller
router.get("/getAllProducts", productsController.getAllProductsHandler);
router.get("/getProductsByNameAndOrCategory", productsController.getProductsByNameAndOrCategoryHandler ); 

// Routes for categories controller
router.get("/getCategoriesNameAndNumber", categoriesController.getCategoriesNameAndNumberHandler)

//Routes for carte controller
router.post("/addProductsToCart", cartController.addProductsToCartHandler)
export default router;
