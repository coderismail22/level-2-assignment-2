import { z } from 'zod';

// Define the variants schema with validation
const variantsValidationSchema = z.object({
  type: z.string().min(10, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

// Define the inventory schema with validation
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

// Define the product schema with validation
const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  category: z.string().min(1, 'Category is required'),
  tags: z
    .array(z.string().min(1, 'Tags cannot be empty'))
    .nonempty('Tags array cannot be empty'),
  variants: z
    .array(variantsValidationSchema)
    .nonempty('At least one variant is required'),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
