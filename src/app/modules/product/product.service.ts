//CRUD HAPPENS HERE

import { ProductModel } from './product.model';
import { TProduct } from './product.type';

const insertNewProduct = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllProducts = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

const updateSingleProduct = async (
  productId: string,
  productData: TProduct,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true, //shows updated product data
  });
  return result;
};

const getProductBySearchQuery = async (searchTerm: string) => {
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by product name
      { description: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by description
    ],
  });
  return result;
};

const deleteSingleProduct = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

export const productServices = {
  insertNewProduct,
  getAllProducts,
  getSingleProduct,
  getProductBySearchQuery,
  updateSingleProduct,
  deleteSingleProduct,
};
