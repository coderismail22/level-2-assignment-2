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

  // Update the product quantity and inStock status
  await ProductModel.findByIdAndUpdate(
    productId,
    [
      {
        $set: {
          'inventory.quantity': {
            $subtract: ['$inventory.quantity', quantity],
          }, // Decrement the quantity
          'inventory.inStock': {
            $cond: {
              // Conditional operator
              if: {
                $gt: [{ $subtract: ['$inventory.quantity', quantity] }, 0],
              }, // Check if resulting quantity is greater than 0
              then: true, // If true, set inStock to true
              else: false, // If false, set inStock to false
            },
          },
        },
      },
    ],
    { new: true },
  );

  return result;
};

const getAllOrders = async () => {
  const result = await OrderModel.find();
  return result;
};

const getOrdersByEmail = async (email: string) => {
  const result = await OrderModel.find({ email: email });
  if (result.length === 0) {
    throw new Error('Order not found');
  }
  return result;
};

export const orderServices = {
  createNewOrder,
  getAllOrders,
  getOrdersByEmail,
};
