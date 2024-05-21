import express from 'express';
import { orderControllers } from './order.controller';
const router = express.Router();

router.post('/', orderControllers.createNewOrder);
router.get('/', orderControllers.getAllOrders);

export const OrderRoutes = router;
