import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const CartPage = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading, isError } = useCart();

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Tính tổng tiền giỏ hàng
  // Sửa dòng tính totalPrice trong CartPage.tsx
  const totalPrice =
    cart?.items?.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    ) ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/products")}
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
            <span>Tiếp tục mua sắm</span>
          </button>
          <span className="font-bold text-slate-800 text-lg">
            Giỏ Hàng Của Bạn
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm animate-pulse flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-40" />
                    <div className="h-4 bg-slate-200 rounded w-20" />
                  </div>
                </div>
                <div className="h-8 bg-slate-200 rounded w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="max-w-md mx-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Lấy giỏ hàng thất bại
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Không thể kết nối tới máy chủ. Vui lòng thử lại sau.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors"
            >
              Tải lại trang
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!cart || cart.items.length === 0) && (
          <div className="max-w-md mx-auto p-10 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Giỏ hàng đang trống
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và thêm sản
              phẩm ngay!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors"
            >
              Khám phá sản phẩm
            </button>
          </div>
        )}

        {/* Cart List & Summary */}
        {!isLoading && !isError && cart && cart.items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 shrink-0">
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
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base">
                        {item.product.name}
                      </h3>
                      <p className="text-sm font-bold text-blue-600 mt-0.5">
                        {formatCurrency(Number(item.product.price))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <span className="px-3 py-1.5 text-xs font-semibold text-slate-600 border-r border-slate-200 bg-white">
                        Số lượng
                      </span>
                      <span className="px-4 py-1.5 text-sm font-bold text-slate-800">
                        {item.quantity}
                      </span>
                    </div>

                    <p className="text-base font-extrabold text-slate-900">
                      {formatCurrency(
                        Number(item.product.price) * item.quantity,
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Khung thanh toán / Tổng tiền */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <div className="flex justify-between">
                    <span>Tổng số lượng:</span>
                    <span className="font-semibold text-slate-900">
                      {cart.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      sản phẩm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold text-emerald-600">
                      Miễn phí
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-base">
                      Thành tiền:
                    </span>
                    <span className="text-2xl font-extrabold text-blue-600">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/checkout?ids=${cart.items.map((item) => item.product.id).join(",")}`)
                  }
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-sm transition-all duration-200 cursor-pointer text-center"
                >
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
