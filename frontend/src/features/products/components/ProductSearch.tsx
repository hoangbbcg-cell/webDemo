type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  return (
    <div className="relative w-full">
      {/* Icon tìm kiếm bên trái */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input tìm kiếm */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm theo tên sản phẩm..."
        className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 text-slate-800 text-sm rounded-xl shadow-sm placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
      />

      {/* Nút xóa nhanh khi người dùng đã nhập dữ liệu */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};