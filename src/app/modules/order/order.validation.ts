import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'This field has to be filled.')
    .email('This is not a valid email.'),
  productId: z.string().min(1, 'Invalid product ID'),
  price: z.number().min(1, 'Cannot keep price empty'),
  quantity: z.number().min(1, 'Cannot keep price empty'),
});
