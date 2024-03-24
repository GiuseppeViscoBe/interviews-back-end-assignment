import { Request, Response, NextFunction } from "express";
import { PaginationResponse } from "../typings/paginationResponse";
import { PaginationResult } from "../typings/paginationResult";

export const paginationHandler = (model: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);
    const skipIndex: number = (page - 1) * limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const result: PaginationResult = {
      products: [],
    };

    if (endIndex < (await model.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }


    try {
      result.products = await model.find().limit(limit).skip(skipIndex);
      (res as PaginationResponse).results = result;
      next();
    } catch (e: any) {      
      next(e);
    }
  };
};

export default paginationHandler;
