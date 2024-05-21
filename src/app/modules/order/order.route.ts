import express from 'express';
import { orderControllers } from './order.controller';
const router = express.Router();

router.post('/', orderControllers.createNewOrder);

export const OrderRoutes = router;
