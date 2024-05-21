import { Request, Response } from 'express';
import { orderServices } from './order.service';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const result = await orderServices.createNewOrder(orderData);
    console.log('try hitting', result);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const orderControllers = {
  createNewOrder,
};
