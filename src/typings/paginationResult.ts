import Product from "../models/entities/productModel";

export interface PaginationResult {
    products: typeof Product[];
    next?: {
      page: number;
      limit: number;
    };
    previous?: {
      page: number;
      limit: number;
    };
  }