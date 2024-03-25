// import Product from "../models/entities/product.model";
// import Cart from "../models/entities/cart.model";

// export async function addProductToCart(
//   productId: string,
//   quantity: number
// ): Promise<IAddToCartResponse> {
//   try {
//     const product = await Product.findById(productId);

//     if (!product) {
//       return { product: null, quantityAvailable: false };
//     }

//     const quantityAvailable = quantity <= product.quantity;



//     if (!quantityAvailable) {
//       return { product, quantityAvailable : false};
//     }
    
//     product.quantity = quantity;
//     const cartItem = new Cart({ product });
//     await cartItem.save();

//     return { product, quantityAvailable : true};
//   } catch (error) {
//     throw error;
//   }
// }


import Product from "../models/entities/product.model";
import Cart from "../models/entities/cart.model";
import { Types } from 'mongoose';

export async function addProductToCart(
  productId: string,
  quantity: number
): Promise<IAddToCartResponse> {
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
