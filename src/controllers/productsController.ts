import { Request, Response } from "express";
import Product from "../models/productModel"
import asyncHandler from 'express-async-handler'
import { PaginationResponse } from './../typings/paginationResponse';

//@desc Get all products
//@route GET/api/products
//@access public
const getProducts = asyncHandler(async(req: Request, res: PaginationResponse) =>{
    
    const products = res.paginatedResult?.results ?? [];
    const next = res.paginatedResult?.next;
    const previous = res.paginatedResult?.previous;

    if(products.length == 0){
        res.status(404)
        throw new Error("No products available in the database.")
    }
    res.status(200).json({
        next,
        previous,
        products
      });
})


export default getProducts;

