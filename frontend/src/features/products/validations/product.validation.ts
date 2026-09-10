import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  price: z.number().positive("Giá phải lớn hơn 0"),
  server: z.string().min(1, "Server không được để trống"),
  account: z.string().min(1, "Tài khoản không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
})

export type CreateProductInput =
  z.infer<typeof createProductSchema>