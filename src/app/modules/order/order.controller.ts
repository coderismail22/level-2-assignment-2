import { Request, Response } from 'express';
import { orderServices } from './order.service';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const result = await orderServices.createNewOrder(orderData);
    if (result !== null) {
      res.status(401).json({
        success: false,
        message: 'Could not create order!',
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
      error,
    });
  }
};
