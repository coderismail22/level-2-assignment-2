import { Request, Response } from 'express';
import { productServices } from './product.service';
import { z } from 'zod';
import productValidationSchema from './product.validation';

const insertNewProduct = async (req: Request, res: Response) => {
  try {
    //call insertNewProduct services
    const { product: productData } = req.body;
    console.log('check', productData);
    const zodValidatedProductData = productValidationSchema.parse(productData);
    const result = await productServices.insertNewProduct(
      zodValidatedProductData,
    );
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    // Check if error object has issues property
    if (typeof error === 'object' && error !== null && 'issues' in error) {
      // Extract error messages
      const errorMessages = (error as any).issues.map(
        (issue: any) => issue.message,
      );

      // Send the error messages in the response
      res.status(500).json({
        success: false,
        error: errorMessages,
      });
    } else {
      // If error object does not have issues property, send a general error response
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
      });
    }
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
