//CRUD HAPPENS HERE

import { ProductModel } from './product.model';
import { TProduct } from './product.type';

const insertNewProduct = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

export const productServices = {
  insertNewProduct,
};
