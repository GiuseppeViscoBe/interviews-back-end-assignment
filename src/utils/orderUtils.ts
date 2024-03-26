import Product from "../models/entities/product.model";
import Cart from "../models/entities/cart.model";

export const getUnavailableProducts = async (cartItems: any[]) => {
  try {
    const productUnavailable = [];

    for (let item of cartItems) {
      const product = await Product.findById(item.id);
      if (product && product.quantity < item.quantity) {
        productUnavailable.push({ id: item.id, isQuantityUnavailable: true });
      }
    }

    return productUnavailable;
  } catch (error) {
    throw error;
  }
};

export const updateProductsAndCart = async (cartItems: any[]) => {
  try {
    for (let item of cartItems) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { quantity: -item.quantity },
      });
    }
    await Cart.deleteMany({});
  } catch (error) {
    throw error;
  }
};
