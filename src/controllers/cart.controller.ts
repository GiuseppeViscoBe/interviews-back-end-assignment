import { Request, Response, NextFunction } from "express";
import * as productsService from "../services/cart.service";
import errorHandler from "../middleware/errorHandler";

//@desc Post product in the cart
//@route POST/api/postProducts
//@access public
const addProductsToCartHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const error = await productsService.addProductToCart(productId, quantity);

        if (error===400) {
            res.status(400).json({ message: "Quantity requested unavailable" });
        }
        else if(error===404){
            res.status(400).json({ message: "No products were found with this id" });
        } else {
            res.status(200).json({ message: "Product added to cart successfully" });
        }
    } catch (error) {
        next(error);
    }
}

export default {
    addProductsToCartHandler
  };