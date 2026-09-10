import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../products/hooks/useProducts";
import { AdminProductItem } from "../components/AdminProductTable";

export const AdminProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { productsQuery } = useProducts();

  const {
    data: products = [],
    isLoading,
    isError,
  } = productsQuery;

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Link to="/" className="hover:underline">Trang chủ</Link>
              <span>/</span>
              <span className="text-slate-400">Admin</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Quản lý sản phẩm</h1>
            <p className="text-xs text-slate-500 mt-1">
              Quản lý danh sách, chỉnh sửa và thêm mới tài khoản game vào hệ thống.
            </p>
          </div>

          <Link
            to="/admin/products/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm sản phẩm mới</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc Mã SP..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Tổng số: <span className="text-slate-900 font-bold">{filteredProducts.length}</span> sản phẩm
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-slate-600">Đang tải danh sách sản phẩm...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Lấy dữ liệu thất bại</h3>
            <p className="text-xs text-slate-500">Không thể kết nối đến máy chủ. Vui lòng thử lại sau.</p>
          </div>
        )}

        {/* Products Table Container */}
        {!isLoading && !isError && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Mã SP</th>
                      <th className="py-3.5 px-4">Tên sản phẩm</th>
                      <th className="py-3.5 px-4">Giá bán</th>
                      <th className="py-3.5 px-4">Server</th>
                      <th className="py-3.5 px-4">Kho hàng</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredProducts.map((product) => (
                      <AdminProductItem key={product.id} product={product} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-sm text-slate-500 font-medium">
                  {searchTerm ? "Không tìm thấy sản phẩm nào phù hợp." : "Chưa có sản phẩm nào trong hệ thống."}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};