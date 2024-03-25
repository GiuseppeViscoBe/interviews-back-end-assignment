import Product from "../models/entities/productModel";
import Cart from "../models/entities/cartModel";

export async function addProductToCart(productId: string, quantity: number): Promise<number | null> {
    try{
        const product = await Product.findById(productId);

        if (!product) {
            console.log("i am returning 404")
            return 404;
        }
    
        if (quantity > product.availableQuantity) {
            return 400;
        }
    
        const cartItem = new Cart({
            product: product
        });
    
        await cartItem.save();
    
        return null;
    }
    catch(error){
        throw (error)
    }
    
}
