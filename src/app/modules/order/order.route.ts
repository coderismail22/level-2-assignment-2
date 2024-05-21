import express from 'express';
import { orderControllers } from './order.controller';
import { request } from 'http';
const router = express.Router();



router.post('/', orderControllers.createNewOrder);

export const OrderRoutes = router;
