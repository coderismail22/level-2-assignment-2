import { Request, Response } from 'express';
import { OrderModel } from './order.model';
import { TOrder } from './order.type';

const createNewOrder = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};

export const orderServices = {
  createNewOrder,
};
