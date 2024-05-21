import { model } from 'mongoose';
import { orderSchema } from './order.schema';

export const OrderModel = model('order', orderSchema);
