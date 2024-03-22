import Product from "../models/productModel";

export interface PaginationResult {
    results: typeof Product[];
    next?: {
        page: number;
        limit: number;
    };
    previous?: {
        page: number;
        limit: number;
    };
}
