import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ProductSearch } from "../components/ProductSearch";
import { ProductSort } from "../components/ProductSort";
import { ProductCard } from "../components/ProductCard";
import { ProductPagination } from "../components/ProductPagination";
import { ProductHeader } from "../components/ProductHeader";

export const ProductPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price_asc");

  const { productsQuery } = useProducts(page, search, sort);

  const { data: products = [], isLoading, isError } = productsQuery;

  const handlePreviousPage = () => {
    if (page === 1) return;
    setPage((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    if (products.length < 20) return;
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Wrapper chính giúp căn giữa toàn bộ trang */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Header trang (Đã bao gồm Tiêu đề + Nút thêm nick) */}
        <ProductHeader
          productCount={products.length}
          onCreateProduct={() => navigate("/products/create")}
        />

        {/* Thanh Tìm kiếm & Sắp xếp */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <ProductSearch
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          <ProductSort
            value={sort}
            onChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          />
        </div>

        {/* Trạng thái Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between h-80"
              >
                <div className="w-full h-36 bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
                <div className="h-9 bg-slate-200 rounded-lg w-full mt-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Trạng thái Lỗi */}
        {isError && (
          <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-100 rounded-2xl text-center">
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <h3 className="font-semibold text-red-800 text-lg mb-1">
              Tải dữ liệu thất bại
            </h3>

            <p className="text-sm text-red-600 mb-4">
              Không thể kết nối đến máy chủ. Vui lòng thử lại sau.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              Tải lại trang
            </button>
          </div>
        )}

        {/* Danh sách sản phẩm & Phân trang */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <ProductPagination
              page={page}
              hasNextPage={products.length === 20}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          </>
        )}
      </main>
    </div>
  );
};