import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import { loginSchema } from "../validations/auth.validation"

export const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const navigate = useNavigate()
  const loginMutation = useLogin()

  const clearError = (
    field: "email" | "password"
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const result = loginSchema.safeParse({
      email,
      password,
    })

    if (!result.success) {
      const fieldErrors =
        result.error.flatten().fieldErrors

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })

      return
    }

    setErrors({})

    loginMutation.mutate(result.data, {
      onSuccess: () => {
        navigate("/products")
      },
    })
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative z-10">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Chào mừng trở lại
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Vui lòng nhập thông tin để truy cập tài khoản
          </p>
        </div>

        {loginMutation.isError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100">
            <p className="font-semibold text-red-700">
              Đăng nhập thất bại
            </p>

            <p className="text-xs text-red-600 mt-1">
              Email hoặc mật khẩu không chính xác.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Địa chỉ Email
            </label>

            <input
              id="email"
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearError("email")
              }}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Mật khẩu
            </label>

            <div className="relative">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError("password")
                }}
                className="w-full px-4 py-2.5 pr-12 border border-slate-200 rounded-lg"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
          >
            {loginMutation.isPending
              ? "Đang xử lý..."
              : "Đăng nhập"}
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/register")
              }
              className="font-semibold text-blue-600"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}