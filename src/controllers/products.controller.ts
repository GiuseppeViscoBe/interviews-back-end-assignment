import { Request, Response, NextFunction } from "express";
import Product from "../models/entities/productModel";
  

//@desc Get all products
//@route GET/api/products
//@access public
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const skipIndex: number = (page - 1) * limit;

    const totalProducts = await Product.countDocuments().exec();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find().limit(limit).skip(skipIndex);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in the database" });
    }

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      }
    });
  } catch (error) {
    next(error);
  }
};

//@desc Get products by name and/or category
//@route GET/api/products
//@access public
const getProductsByNameAndOrCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productName = req.query.pName || "";
    const categoryName = req.query.cName || "";
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const skipIndex: number = (page - 1) * limit;

    const totalProducts = await Product.countDocuments().exec();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
      category: { $regex: categoryName, $options: "i" },
    }).limit(limit).skip(skipIndex);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found with this name" });
    }

    res.status(200).json({
        products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: page,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        }
      });
  } catch (error) {
    next(error);
  }
};

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
  getProducts,
  getProductsByNameAndOrCategory,
  getCategoriesNameAndNumber,
};
