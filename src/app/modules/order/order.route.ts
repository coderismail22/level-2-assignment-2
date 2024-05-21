import express, { Request, Response } from 'express';
import { orderControllers } from './order.controller';
const router = express.Router();

interface EmailQuery extends Request {
  query: {
    email?: string;
  };
}

//to maintain the same api endpoint
const checkEmail = (req: EmailQuery, res: Response) => {
  if (req.query.email) {
    return orderControllers.getOrdersByEmail(req, res);
  } else {
    return orderControllers.getAllOrders(req, res);
  }
};

router.post('/', orderControllers.createNewOrder);
router.get('/', checkEmail);

export const OrderRoutes = router;
