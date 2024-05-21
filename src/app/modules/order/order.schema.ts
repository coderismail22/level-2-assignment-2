import { Schema } from 'mongoose';
import { TOrder } from './order.type';

export const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true, unique: true },
  productId: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
