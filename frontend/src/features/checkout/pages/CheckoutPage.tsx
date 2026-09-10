import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueries } from "@tanstack/react-query"
import axios from "axios"
import { getProductById } from "../../products/api/product.api"
import { useCreateOrder } from "../../order/hooks/useCreateOrder"

export const CheckoutPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const createOrderMutation = useCreateOrder()
  const rawIds = searchParams.get("ids")?.split(",") ?? []
  const validIds = rawIds.length > 0 && rawIds.length <= 100 && rawIds.every((id) => /^\d+$/.test(id) && Number.isSafeInteger(Number(id)) && Number(id) > 0)
  const productIds = validIds ? [...new Set(rawIds.map(Number))] : []
  const products = useQueries({
    queries: productIds.map((id) => ({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
      retry: false,
      staleTime: 0,
      refetchOnMount: "always" as const,
    })),
  })
  const items = products.flatMap((query) => query.data ? [{ id: query.data.id, product: query.data, quantity: 1 }] : [])
  const isLoading = products.some((query) => query.isPending)
  const isUnavailable = products.some((query) => query.isError)
  const orderError = createOrderMutation.error
  const errorMessage = axios.isAxiosError(orderError)
    ? orderError.response?.data?.message ?? "Không thể tạo đơn hàng. Vui lòng thử lại."
    : "Không thể tạo đơn hàng. Vui lòng thử lại."

  const formatCurrency = (
    amount: number
  ) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const totalPrice = items.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) *
        item.quantity,
    0
  )

  const handleOrder = () => {
    if (createOrderMutation.isPending || isLoading || isUnavailable || items.length === 0) return
    const productIds = items.map(
      (item) => item.product.id
    )

    createOrderMutation.mutate(
      {
        productIds,
      },
      {
        onSuccess: () => {
          navigate(
            "/purchased-products"
          )
        },
      }
    )
  }

  if (isLoading) {
    return <div className="p-10 text-center text-slate-500">Đang tải các nick thanh toán...</div>
  }
  if (isUnavailable) {
    return <div className="p-10 text-center space-y-4">
      <p role="alert" className="text-red-600">Không thể tải đầy đủ nick đã chọn. Có thể nick đã được bán hoặc kết nối bị gián đoạn.</p>
      <button className="text-blue-600 font-semibold" onClick={() => { products.forEach((query) => { void query.refetch() }) }}>Thử lại</button>
      <button className="block mx-auto text-blue-600" onClick={() => navigate("/cart")}>Quay lại giỏ hàng</button>
    </div>
  }
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center max-w-md w-full">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Không có sản phẩm
          </h2>

          <p className="text-xs text-slate-500 mb-6">
            Không có sản phẩm nào để
            thanh toán.
          </p>

          <button
            onClick={() =>
              navigate("/cart")
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl"
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
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

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h1 className="text-xl font-bold text-slate-900">
              Xác nhận thanh toán
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              Vui lòng kiểm tra lại các
              sản phẩm trước khi xác nhận.
            </p>
          </div>

          {/* Products */}
          <div className="p-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-8 h-8 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">
                    Mã SP: #
                    {item.product.id}
                  </span>

                  <h3 className="font-bold text-slate-900 text-base mt-1">
                    {item.product.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Server:{" "}
                    <span className="font-semibold text-slate-700">
                      {item.product.server ??
                        "Chưa rõ"}
                    </span>
                  </p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">
                    {formatCurrency(
                      Number(
                        item.product.price
                      ) *
                        item.quantity
                    )}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    SL: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="px-6 pb-6">
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>
                  Tổng sản phẩm:
                </span>

                <span className="font-semibold text-slate-900">
                  {items.length}
                </span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>
                  Phí dịch vụ:
                </span>

                <span className="font-semibold text-emerald-600">
                  Miễn phí
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                <span className="font-bold text-slate-900">
                  Tổng thanh toán:
                </span>

                <span className="text-xl font-extrabold text-blue-600">
                  {formatCurrency(
                    totalPrice
                  )}
                </span>
              </div>
            </div>
          </div>

          {createOrderMutation.isError && <p role="alert" className="px-6 pb-4 text-sm text-red-600">{errorMessage}</p>}
          <button className="px-6 pb-4 text-sm text-blue-600" onClick={() => navigate("/cart")}>Quay lại giỏ hàng</button>
          {/* Action */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button
              type="button"
              onClick={handleOrder}
              disabled={
                createOrderMutation.isPending
              }
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {createOrderMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                  <span>
                    Đang xử lý đơn
                    hàng...
                  </span>
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>
                    Xác nhận mua{" "}
                    {items.length} nick
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
