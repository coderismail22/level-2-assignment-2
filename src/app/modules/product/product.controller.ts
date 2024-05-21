import { Request, Response } from 'express';
import { productServices } from './product.service';

const insertNewProduct = async (req: Request, res: Response) => {
  try {
    //call insertNewProduct services
    const { product: productData } = req.body;
    console.log('check', productData);
    const result = await productServices.insertNewProduct(productData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  insertNewProduct,
};
