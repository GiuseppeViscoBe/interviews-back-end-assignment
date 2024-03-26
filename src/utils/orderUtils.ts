import Product from "../models/entities/product.model";
import Cart from "../models/entities/cart.model";
import UserInfo from "../models/entities/userInfo.model";

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
    console.log("uodateproducts and cart " + cartItems )
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

export const manageDiscountPoints = (totalAmountToPay : number,discountPoints : number | undefined) =>{

  if (discountPoints === undefined || discountPoints === 0) {
    return { totalAmountToPay, remainingPoints: 0 };
  }

  const discountAmount = Math.floor(discountPoints / 25);
  let totalAmountToPayAfterDiscount = totalAmountToPay - discountAmount
  totalAmountToPayAfterDiscount = totalAmountToPayAfterDiscount > 0 ? totalAmountToPayAfterDiscount : 0

  const remainingPoints = discountPoints - (discountAmount * 25);
  return { totalAmountToPayAfterDiscount, remainingPoints };
}

export const calculateDiscountPointsEarned = (cartItems: any[],totalAmount : number) =>{
  let pointsEarned = 0
  
  for(let item of cartItems){
    pointsEarned += item.extraPoints
  }
  pointsEarned += Math.floor(totalAmount)

  return pointsEarned
}

export const updateUserPoints = async (remainingPoints: number) => {
  try {
    await UserInfo.updateMany({}, { earnedPoints: remainingPoints });
  } catch (error) {
    throw error;
  }
};

export const addUserPoints = async (earnedPoints: number) => {
  try {
    const userInfo = await UserInfo.findOne();

    const updatedPoints = userInfo ? userInfo.earnedPoints + earnedPoints : earnedPoints;

    await UserInfo.updateMany({}, { earnedPoints: updatedPoints });
  } catch (error) {
    throw error;
  }
};

