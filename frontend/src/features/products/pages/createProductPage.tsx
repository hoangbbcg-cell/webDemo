import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useProducts } from "../hooks/useProducts"
import { createProductSchema } from "../validations/product.validation"

export const CreateProductPage = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [server, setServer] = useState("")
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState<{
    name?: string
    price?: string
    server?: string
    account?: string
    password?: string
  }>({})

  const navigate = useNavigate()
  const { createProductMutation } = useProducts()

  const clearError = (
    field:
      | "name"
      | "price"
      | "server"
      | "account"
      | "password"
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const result = createProductSchema.safeParse({
      name,
      price: Number(price),
      server,
      account,
      password,
    })

    if (!result.success) {
      const fieldErrors =
        result.error.flatten().fieldErrors

      setErrors({
        name: fieldErrors.name?.[0],
        price: fieldErrors.price?.[0],
        server: fieldErrors.server?.[0],
        account: fieldErrors.account?.[0],
        password: fieldErrors.password?.[0],
      })

      return
    }

    setErrors({})

    await createProductMutation.mutateAsync(
      result.data
    )

    navigate("/products")
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>

            <span>Quay lại</span>
          </button>

          <span className="font-bold text-slate-800 text-lg">
            Tạo Sản Phẩm Mới
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Thông tin sản phẩm
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Điền các thông tin chi tiết bên dưới để
              thêm sản phẩm mới.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Tên sản phẩm
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  clearError("name")
                }}
                placeholder="Nhập tên sản phẩm..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Giá (VND)
              </label>

              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(
                    e.target.value === ""
                      ? ""
                      : Number(e.target.value)
                  )

                  clearError("price")
                }}
                placeholder="Nhập giá sản phẩm..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
              />

              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Server */}
            <div>
              <label
                htmlFor="server"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Server máy chủ
              </label>

              <input
                id="server"
                type="text"
                value={server}
                onChange={(e) => {
                  setServer(e.target.value)
                  clearError("server")
                }}
                placeholder="Nhập server..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
              />

              {errors.server && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.server}
                </p>
              )}
            </div>

            {/* Account */}
            <div>
              <label
                htmlFor="account"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Tài khoản
              </label>

              <input
                id="account"
                type="text"
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value)
                  clearError("account")
                }}
                placeholder="Nhập tài khoản..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
              />

              {errors.account && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.account}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Mật khẩu
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError("password")
                }}
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Backend Error */}
            {createProductMutation.isError && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                Tạo sản phẩm thất bại. Vui lòng kiểm
                tra lại thông tin.
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() =>
                  navigate("/products")
                }
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={
                  createProductMutation.isPending
                }
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium text-sm rounded-xl"
              >
                {createProductMutation.isPending
                  ? "Đang tạo..."
                  : "Thêm Product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}