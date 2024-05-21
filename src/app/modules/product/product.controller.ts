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
      error,
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
      error,
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
      error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product: productData } = req.body;

    const result = await productServices.updateSingleProduct(
      productId,
      productData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not update the product!',
      error,
    });
  }
};
const getProductBySearchQuery = async (req: Request, res: Response) => {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    const result = await productServices.getProductBySearchQuery(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term ${searchTerm} fetched successfully!`,
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

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteSingleProduct(productId);
    console.log('result', result);

    if (result === null) {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not delete product!',
      error,
    });
  }
};
export const productControllers = {
  insertNewProduct,
  getAllProducts,
  getSingleProduct,
  getProductBySearchQuery,
  updateSingleProduct,
  deleteSingleProduct,
};
