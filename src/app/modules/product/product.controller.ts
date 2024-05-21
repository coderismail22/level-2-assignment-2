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
    res.status(500).json({
      success: false,
      message: 'Could not create student data.',
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch data.',
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProduct(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch data.',
      error: error,
    });
  }
};
export const productControllers = {
  insertNewProduct,
  getAllProducts,
  getSingleProduct,
};
