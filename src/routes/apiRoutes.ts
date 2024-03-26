import express from 'express';
import productsController from '../controllers/products.controller';
import Product from '../models/entities/product.model';
import paginationHandler from '../middleware/paginationHandler';
import categoriesController from '../controllers/categories.controller';
import cartController from '../controllers/cart.controller';
import orderPlacementController from '../controllers/orderPlacement.controller';

const router = express.Router();

// Routes for products controller
router.get("/getAllProducts", productsController.getAllProductsHandler);
router.get("/getProductsByNameAndOrCategory", productsController.getProductsByNameAndOrCategoryHandler ); 

// Routes for categories controller
router.get("/getCategoriesNameAndNumber", categoriesController.getCategoriesNameAndNumberHandler)

//Routes for carte controller
router.post("/addProductsToCart", cartController.addProductsToCartHandler)
router.get("/getCart", cartController.getCartHandler)

//Routes for order placement
router.post("/placeOrder", orderPlacementController.placeOrderHandler)
export default router;
