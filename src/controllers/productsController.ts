import { Request, Response } from "express";
import Product from "../models/productModel"

//@desc Get all products
//@route GET/api/products
//@access public
const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();
    console.log(product)
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export default getProducts;