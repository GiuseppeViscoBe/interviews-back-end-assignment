import { Request, Response } from "express";

//@desc Get all products
//@route GET/api/products
//@access public
const getProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({message: "Prodotti caricati"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export default getProducts;