import Product from "../models/entities/product.model";

export const getCategoriesNameAndNumber = async() => {
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

    return categoriesWithProductCount;
  } catch (error) {
    throw error;
  }
}
