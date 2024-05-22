import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';
interface Issue {
  message: string;
}

interface ValidationError {
  issues: Issue[];
}
const insertNewProduct = async (req: Request, res: Response) => {
  try {
    //call insertNewProduct services
    const { product: productData } = req.body;
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
      const validationError = error as ValidationError;
      const errorMessages = validationError.issues.map(
        (issue: Issue) => issue.message,
      );

      // Send the error messages in the response for zod validation error
      res.status(500).json({
        success: false,
        error: errorMessages,
      });
      return;
    }

    // If there's no zod validation error
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({
      success: false,
      error: errorMessage,
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
    const errorMessage =
      error instanceof Error ? error?.message : 'Product not found';
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product: productData } = req.body;
    const zodValidatedProductData = productValidationSchema.parse(productData);
    const result = await productServices.updateSingleProduct(
      productId,
      zodValidatedProductData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    // Check if error object has issues property
    if (typeof error === 'object' && error !== null && 'issues' in error) {
      // Extract error messages
      const validationError = error as ValidationError;
      const errorMessages = validationError.issues.map(
        (issue: Issue) => issue.message,
      );

      // Send the error messages in the response for zod validation error
      res.status(500).json({
        success: false,
        error: errorMessages,
      });
      return;
    }

    // If there's no zod validation error
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};
const getProductBySearchQuery = async (req: Request, res: Response) => {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    const result = await productServices.getProductBySearchQuery(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Product not found';
    res.status(500).json({
      success: false,
      error: errorMessage,
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
