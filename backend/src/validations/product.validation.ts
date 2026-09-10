import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  server: z.number(),
  account: z.string().min(1),
  password: z.string().min(1),
})

export const productIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/),
})

export const productQuerySchema = z.object({
  search: z.string().optional(),
})