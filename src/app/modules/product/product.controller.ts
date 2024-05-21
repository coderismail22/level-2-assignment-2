import { Request, Response } from 'express';
import { productServices } from './product.service';

const insertNewProduct = async (req: Request, res: Response) => {
  try {
    //call insertNewProduct services
    const { product } = req.body;
    const result = await productServices.insertNewProduct(product);
    res.send(200).json({
      success: true,
      message: 'Inserted product successfully',
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  insertNewProduct,
};
