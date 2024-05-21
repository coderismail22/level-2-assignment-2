import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

router.post('/', productControllers.insertNewProduct);
router.get('/', productControllers.getAllProducts);
router.get('/:productId', productControllers.getSingleProduct);

export const ProductRoutes = router;
