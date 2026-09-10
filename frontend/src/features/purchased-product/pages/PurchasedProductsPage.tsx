import { useState } from "react";
import { usePurchasedProducts } from "../hooks/usePurchasedProducts";

export const PurchasedProductsPage = () => {


  const {
    data: orders = [],
    isLoading,
    isError,
  } = usePurchasedProducts();

  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <p className="text-gray-500 animate-pulse font-medium">
          Đang tải danh sách sản phẩm...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <p className="text-red-500 font-medium">
          Lấy sản phẩm đã mua thất bại. Vui lòng thử lại sau!
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm đã mua</h1>
        <div className="bg-gray-50 rounded-lg p-8 border border-dashed border-gray-300">
          <p className="text-gray-500">Bạn chưa mua sản phẩm nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sản phẩm đã mua</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((item, index) => {
          const keyId = item?.id ?? index;
          return (
            <div
              key={keyId}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Header của sản phẩm */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {item?.name ?? "Sản phẩm không có tên"}
                  </h2>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                    Server: {item?.server ?? "N/A"}
                  </span>
                </div>

                <p className="text-sm font-bold text-emerald-600 mb-4">
                  {/* Chuyển item.price thành Number */}
                  {item?.price
                    ? `${Number(item.price).toLocaleString("vi-VN")} đ`
                    : "0 đ"}
                </p>

                {/* Thông tin tài khoản & mật khẩu */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tài khoản:</span>
                    <span className="font-mono font-medium text-gray-800 select-all">
                      {item?.account ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Mật khẩu:</span>
                    <span className="font-mono font-medium text-gray-800 select-all">
                      {item?.password ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() =>
                    handleCopy(
                      `TK: ${item?.account || ""} | MK: ${item?.password || ""}`,
                      String(keyId),
                    )
                  }
                  className="w-full py-2 px-3 text-xs font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-300"
                >
                  {copiedIndex === String(keyId)
                    ? "✓ Đã sao chép"
                    : "Sao chép TK/MK"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
