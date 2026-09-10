import { Link } from "react-router-dom";

export const HomePage = () => {


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Navbar */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-lg mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Hệ Thống Mua Bán Nick Game Uy Tín
            </h1>
            <p className="text-blue-100 text-base sm:text-lg max-w-xl">
              Giao dịch tự động 24/7, nhận tài khoản ngay lập tức sau khi thanh toán.
            </p>
          </div>
          <Link
            to="/products"
            className="px-6 py-3.5 bg-white text-blue-600 font-bold text-sm rounded-xl shadow-md hover:bg-blue-50 transition-all cursor-pointer whitespace-nowrap"
          >
            Khám phá danh sách
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Lựa chọn dịch vụ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Sản phẩm */}
            <Link
              to="/products"
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Cửa hàng Sản phẩm</h3>
              <p className="text-xs text-slate-500">Xem tất cả các nick game đang rao bán giá tốt.</p>
            </Link>

            {/* Nick đã mua */}
            <Link
              to="/purchased-products"
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Nick đã mua</h3>
              <p className="text-xs text-slate-500">Kiểm tra thông tin tài khoản và mật khẩu đã sở hữu.</p>
            </Link>

            {/* Đơn hàng */}
            <Link
              to="/orders"
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Quản lý Đơn hàng</h3>
              <p className="text-xs text-slate-500">Theo dõi trạng thái lịch sử giao dịch thanh toán.</p>
            </Link>
          </div>
        </section>

        {/* Account & Admin Quick Links */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Lối tắt quản trị & tài khoản
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products"
              className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-medium text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              <span>Quản lý Admin</span>
            </Link>

            <Link
              to="/login"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
            >
              Đăng nhập
            </Link>

            <Link
              to="/register"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
            >
              Đăng ký
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Game Store System. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};