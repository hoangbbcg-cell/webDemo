import { Link } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";

export const OrderPage = () => {
  const { data: orders = [], isLoading, isError } = useOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <p className="text-gray-500 animate-pulse font-medium">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <p className="text-red-500 font-medium">Lấy đơn hàng thất bại. Vui lòng thử lại sau!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng của tôi</h1>

      {orders.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center">
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order?.id ?? index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Header của Đơn hàng */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <span className="font-bold text-gray-800">Đơn #{order?.id ?? "N/A"}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Ngày mua:{" "}
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleString("vi-VN")
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 flex flex-wrap gap-2 justify-between items-center text-sm">
                <span>{order.items.length} nick · Tổng: {order.items.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toLocaleString("vi-VN")} đ</span>
                <Link to="/purchased-products" className="text-blue-600 font-semibold">Xem nick đã mua</Link>
              </div>
              {/* Danh sách Sản phẩm trong Đơn */}
              <div className="p-4 divide-y divide-gray-100">
                {order?.items?.map((item, itemIdx) => (
                  <div
                    key={item?.id ?? itemIdx}
                    className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">
                        {item?.name ?? "Sản phẩm không có tên"}
                      </p>
                      <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded font-medium">
                        Server: {item?.server ?? "N/A"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">
                        {item?.price
                          ? `${Number(item.price).toLocaleString("vi-VN")} đ`
                          : "0 đ"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
