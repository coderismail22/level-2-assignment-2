import { model } from 'mongoose';
import productSchema from './product.schema';
import { TProduct } from './product.type';

//create model using schema
export const ProductModel = model<TProduct>('ProductModel', productSchema);
