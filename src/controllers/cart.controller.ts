import { Request, Response, NextFunction } from "express";
import * as productsService from "../services/cart.service";
import errorHandler from "../middleware/errorHandler";

//@desc Post product in the cart
//@route POST/api/postProducts
//@access public
const addProductsToCartHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    const { product} =
      await productsService.addProductToCart(productId, quantity);

    if (!product) {
      return res
        .status(404)
        .json({ message: "No products found in the database" });
    }

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  addProductsToCartHandler,
};
