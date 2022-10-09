import { string, number, object } from 'yup';

export const productSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required(),
  count: number().required()
})
