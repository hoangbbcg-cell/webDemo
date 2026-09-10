import { Link } from "react-router-dom";
import type { Product } from "../../products/types/product.types";
import { useDeleteProduct } from "../../products/hooks/useDeleteProduct";

type Props = {
  product: Product;
};

export const AdminProductItem = ({ product }: Props) => {
  const { deleteProductMutation } = useDeleteProduct();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" (#${product.id})?`)) {
      deleteProductMutation.mutate(product.id);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      {/* Mã SP */}
      <td className="py-4 px-4 font-semibold text-slate-500 text-xs">
        #{product.id}
      </td>

      {/* Tên sản phẩm */}
      <td className="py-4 px-4">
        <p className="font-bold text-slate-900 line-clamp-1">{product.name}</p>
      </td>

      {/* Giá bán */}
      <td className="py-4 px-4 font-extrabold text-blue-600 whitespace-nowrap">
        {formatCurrency(Number(product.price))}
      </td>

      {/* Server */}
      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
        {product.server !== undefined && product.server !== null ? (
          <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium">
            Server {product.server}
          </span>
        ) : (
          <span className="text-slate-400 italic text-xs">Không có</span>
        )}
      </td>

      {/* Số lượng / Tồn kho */}
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            product.quantity > 0
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          {product.quantity > 0 ? `Còn ${product.quantity}` : "Hết hàng"}
        </span>
      </td>

      {/* Thao tác */}
      <td className="py-4 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-2">
          {/* Nút sửa */}
          <Link
            to={`/admin/products/edit/${product.id}`}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Chỉnh sửa"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>

          {/* Nút xóa */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteProductMutation.isPending}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Xóa sản phẩm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};