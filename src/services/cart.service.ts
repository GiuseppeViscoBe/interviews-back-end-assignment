import Product from "../models/entities/product.model";
import Cart from "../models/entities/cart.model";
import { Types } from 'mongoose';

export const addProductToCart = async (
  productId: string,
  quantity: number
): Promise<IAddToCartResponse> => {
  try {
    const product = await Product.findById(productId);
    

    if (!product) {
      return { product: null };
    }

    const existingCartItem = await Cart.findOne({ "product._id": new Types.ObjectId(productId) });

    if (existingCartItem) {
      const updatedCartItem = await Cart.updateOne(
        { "product._id": new Types.ObjectId(productId) },
        { $inc: { "product.quantity": quantity } }
      );
      return { product };
    }

    product.quantity = quantity;
    const cartItem = new Cart({ product });
    await cartItem.save();

    return { product};
  } catch (error) {
    throw error;
  }
}


export const getCart = async () => {
  try {
    const cart = await Cart.find()
    

    if (!cart) {
      return null;
    }

    return cart;
  } catch (error) {
    throw error;
  }
}
