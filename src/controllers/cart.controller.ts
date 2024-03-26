import { Request, Response, NextFunction } from "express";
import * as productsService from "../services/cart.service";

//@desc Post product in the cart
//@route POST/api/addProductsToCart
//@access public
const addProductsToCartHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;

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


//@desc GET products in the cart
//@route GET/api/GetCart
//@access public
const getCartHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) =>{
  try {
    const cart =
      await productsService.getCart()

    if (!cart) {
      return res
        .status(404)
        .json({ message: "No products found in the cart" });
    }

    res.status(200).json({cart});
  } catch (error) {
    next(error);
  }
}

export default {
  addProductsToCartHandler,
  getCartHandler
};
