import Product from "../models/entities/product.model";

export const getAllProducts = async (
  page: number,
  limit: number
): Promise<{ products: IProduct[]; pagination: IPagination }> => {
  try {
    const skipIndex: number = (page - 1) * limit;

    const totalProducts = await Product.countDocuments().exec();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find().limit(limit).skip(skipIndex);

    return {
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getProductsByNameAndOrCategory = async (
  productName: string,
  categoryName: string,
  page: number,
  limit: number
): Promise<{ products: IProduct[]; pagination: IPagination }> => {

    try{
        const skipIndex: number = (page - 1) * limit;

        const totalProducts = await Product.countDocuments().exec();
        const totalPages = Math.ceil(totalProducts / limit);
        const products = await Product.find({
          name: { $regex: productName, $options: "i" },
          category: { $regex: categoryName, $options: "i" },
        })
          .limit(limit)
          .skip(skipIndex);
      
        return {
          products,
          pagination: {
            totalProducts,
            totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null,
          },
        };
    }catch(error){
      throw error
    }
  
};


