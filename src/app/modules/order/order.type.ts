export type Order = {
  email: { type: string; required: true; unique: true };
  productId: { type: string; required: true; unique: true };
  price: { type: number; required: true };
  quantity: { type: number; required: true };
};
