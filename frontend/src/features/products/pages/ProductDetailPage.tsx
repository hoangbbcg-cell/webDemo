import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { useAddToCart } from "../../cart/hooks/useAddToCart";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = Number(id);

  const { data: product, isLoading, isError } = useProduct(productId);
  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {
    if (!product) return;

    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate(`/checkout?ids=${product.id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center">
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
            <span>Quay lại danh sách</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-80 bg-slate-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-12 bg-slate-200 rounded-xl w-full mt-8" />
            </div>
          </div>
        )}

        {/* Error State */}
        {(isError || (!isLoading && !product)) && (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Không tìm thấy sản phẩm
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ
              thống.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              Về danh sách sản phẩm
            </button>
          </div>
        )}

        {/* Product Content Card */}
        {product && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Image Placeholder Container */}
            <div className="bg-slate-100 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
              <div className="w-full max-w-xs aspect-square rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                <svg
                  className="w-20 h-20 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                    Mã SP: #{product.id}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.quantity > 0
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {product.quantity > 0 ? "Còn hàng trong kho" : "Hết hàng"}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                  {product.name}
                </h1>

                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Giá niêm yết
                  </p>
                  <p className="text-3xl font-extrabold text-blue-600">
                    {formatCurrency(Number(product.price))}
                  </p>
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Server máy chủ:</span>
                    <span className="font-semibold text-slate-900">
                      {product.server !== undefined && product.server !== null
                        ? `Server ${product.server}`
                        : "Chưa có"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số lượng khả dụng:</span>
                    <span className="font-semibold text-slate-900">
                      {product.quantity} sản phẩm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trạng thái lưu trữ:</span>
                    <span className="font-semibold text-slate-900">
                      Sẵn sàng giao
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                {/* Nút Thêm vào giỏ hàng */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={
                    product.quantity <= 0 || addToCartMutation.isPending
                  }
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 text-slate-800 font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                >
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                  <span>
                    {addToCartMutation.isPending
                      ? "Đang thêm..."
                      : "Thêm vào giỏ hàng"}
                  </span>
                </button>

                {/* Nút Mua ngay */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.quantity <= 0}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Mua ngay</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};