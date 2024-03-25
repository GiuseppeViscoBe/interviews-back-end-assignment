import { Request, Response, NextFunction } from "express";
import Product from "../models/entities/productModel";
import * as productService from "../services/product.service";

//@desc Get all products
//@route GET/api/products
//@access public
const getAllProductsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;

    const { products, pagination } = await productService.getAllProducts(page, limit);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in the database" });
    }

    res.status(200).json({ products, pagination });
  } catch (error) {
    next(error);
  }
};

//@desc Get products by name and/or category
//@route GET/api/products
//@access public
const getProductsByNameAndOrCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productName = req.query.pName as string || "";
    const categoryName = req.query.cName as string || "";
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;

    const { products, pagination } = await productService.getProductsByNameAndOrCategory (
      productName,
      categoryName,
      page,
      limit
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found with this name" });
    }

    res.status(200).json({ products, pagination });
  } catch (error) {
    next(error);
  }
};


export default {
  getAllProductsHandler,
  getProductsByNameAndOrCategoryHandler
};
