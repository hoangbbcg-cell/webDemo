import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Password không được để trống"),
})

export const registerSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})