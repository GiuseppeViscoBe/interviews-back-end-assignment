import { Request, Response, NextFunction } from "express";
import Product from "../models/entities/product.model";
import * as categoriesService from "../services/categories.service"

//@desc Get categories name and number of products per category
//@route GET/api/products
//@access public
const getCategoriesNameAndNumberHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoriesWithProductCount = await categoriesService.getCategoriesNameAndNumber();
  
      if (categoriesWithProductCount.length === 0) {
        return res
          .status(404)
          .json({ message: "No categories found in the database" });
      }
  
      res.status(200).json(categoriesWithProductCount);
    } catch (error) {
      next(error);
    }
  };

  export default {
    getCategoriesNameAndNumberHandler
  };



