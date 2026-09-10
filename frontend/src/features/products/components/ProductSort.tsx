type ProductSortProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ProductSort = ({ value, onChange }: ProductSortProps) => {
  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Icon sắp xếp bên trái */}
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
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
      </div>

      {/* Dropdown Select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto appearance-none pl-10 pr-10 py-2.5 bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl shadow-sm hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
      >
        <option value="price_asc">Giá: Thấp → Cao</option>
        <option value="price_desc">Giá: Cao → Thấp</option>
      </select>

      {/* Icon mũi tên xổ xuống bên phải */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};