import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

router.post('/', productControllers.insertNewProduct);
router.get('/', productControllers.getAllProducts);

export const ProductRoutes = router;
