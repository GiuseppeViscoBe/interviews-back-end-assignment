import { Request, Response, NextFunction } from "express";
import Product from "../models/entities/productModel";
  

//@desc Get categories name and number of products per category
//@route GET/api/products
//@access public
const getCategoriesNameAndNumber = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoriesWithProductCount = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            productCount: { $sum: 1 },
          },
        },
        {
          $project: {
            categoryName: "$_id",
            productCount: 1,
            _id: 0,
          },
        },
      ]);
  
      if (categoriesWithProductCount.length === 0) {
        return res
          .status(404)
          .json({ message: "No categories found in the database" });
      }
  
      res.status(200).json(categoriesWithProductCount);
    } catch (error) {
      next(error)
    }
  };

  export default {
    getCategoriesNameAndNumber
  };