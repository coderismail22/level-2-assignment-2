import express, { NextFunction, Request, Response } from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

// Define the type for the query parameters for extra type safety
interface ProductQuery extends Request {
  query: {
    searchTerm?: string;
  };
}

//to maintain the same api endpoint
const checkSearchTerm = (req: ProductQuery, res: Response) => {
  if (req.query.searchTerm) {
    return productControllers.getProductBySearchQuery(req, res);
  } else {
    return productControllers.getAllProducts(req, res);
  }
};

router.post('/', productControllers.insertNewProduct);
router.get('/:productId', productControllers.getSingleProduct);
router.get('/', checkSearchTerm); //to maintain the same api endpoint
router.put('/:productId', productControllers.updateSingleProduct);
router.delete('/', productControllers.deleteSingleProduct);
export const ProductRoutes = router;
