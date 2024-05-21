import { OrderModel } from './order.model';
import { TOrder } from './order.type';
import { ProductModel } from '../product/product.model';
import { TProduct } from '../product/product.type';

const createNewOrder = async (orderData: TOrder) => {
  const { productId, quantity } = orderData;

  //Fetch Product Details And Check
  const product = (await ProductModel.findById(productId)) as TProduct | null;

  if (!product) {
    throw new Error('Product not found');
  }

  if (!product?.inventory?.inStock || product?.inventory?.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  //Create Order
  const result = await OrderModel.create(orderData);

  //Update the product quantity
  await ProductModel.findByIdAndUpdate(productId, {
    $inc: { 'inventory.quantity': -quantity },
  });

  return result;
};

export const orderServices = {
  createNewOrder,
};
