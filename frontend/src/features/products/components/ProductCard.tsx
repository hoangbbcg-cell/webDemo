import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product.types";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Thumbnail */}
        <div className="w-full h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50/50 transition-colors relative">
          <svg
            className="w-10 h-10 group-hover:text-blue-500 transition-colors"
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

          <div className="absolute top-3 right-3">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                product.server !== undefined && product.server !== null
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {product.server !== undefined && product.server !== null
                ? `Server ${product.server}`
                : "Chưa có server"}
            </span>
          </div>
        </div>

        {/* Info */}
        <h2 className="font-semibold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h2>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            {formatCurrency(product.price)}
          </span>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
              product.quantity > 0
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}
          >
            Kho: {product.quantity}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/products/${product.id}`)}
        className="mt-5 w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-sm"
      >
        <span>Xem chi tiết</span>

        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};
