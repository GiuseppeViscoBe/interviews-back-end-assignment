import { Request, Response, NextFunction } from "express";
import Product from "../models/entities/productModel";
import { PaginationResponse } from '../typings/paginationResponse';

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

export default getProducts;
