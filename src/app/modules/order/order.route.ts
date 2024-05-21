import express from 'express';
import { orderControllers } from './order.controller';
import { request } from 'http';
const router = express.Router();

interface EmailQuery extends Request {
  query: {
    email?: string;
  };
}

//to maintain the same api endpoint
const email = (req: EmailQuery, res: Response) => {
  if (req.query.email) {
    return router.get('/', orderControllers.getOrdersByEmail);
  } else {
    return router.get('/', orderControllers.getAllOrders);
  }
};

router.post('/', orderControllers.createNewOrder);

export const OrderRoutes = router;
