type ProductHeaderProps = {
  productCount: number;
  onCreateProduct: () => void;
};

export const ProductHeader = ({
  productCount,
  onCreateProduct,
}: ProductHeaderProps) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Khối Tiêu đề & Mô tả */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Danh sách sản phẩm
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-xs rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {productCount} Sản phẩm
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Khám phá và quản lý toàn bộ các mặt hàng trong kho hệ thống
          </p>
        </div>

        {/* Khối Hành động */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onCreateProduct}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer shrink-0"
          >
            <svg
              className="w-4 h-4 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Thêm nick mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};