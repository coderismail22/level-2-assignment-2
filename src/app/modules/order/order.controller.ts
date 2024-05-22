import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { orderValidationSchema } from './order.validation';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const zodValidatedOrderData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createNewOrder(zodValidatedOrderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    // Check if error object has issues property
    if (typeof error === 'object' && error !== null && 'issues' in error) {
      // Extract error messages
      const errorMessages = (error as any).issues.map(
        (issue: any) => issue.message,
      );

      // Send the error messages in the response for zod validation error
      res.status(500).json({
        success: false,
        error: errorMessages,
      });
      return;
    }

    //if there's no zod validation error
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Insufficient quantity available in inventory';
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await orderServices.getOrdersByEmail(email);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const orderControllers = {
  createNewOrder,
  getAllOrders,
  getOrdersByEmail,
};
