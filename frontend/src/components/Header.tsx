import { Link } from "react-router-dom"
import { useLogout } from "../features/auth/hooks/useLogout"

export const Header = () => {
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
            S
          </div>

          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Shop Game
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Trang chủ
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Sản phẩm
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Giỏ hàng"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-medium text-sm rounded-xl transition-colors cursor-pointer border border-slate-200 disabled:opacity-50"
          >
            {logoutMutation.isPending
              ? "Đang thoát..."
              : "Đăng xuất"}
          </button>
        </nav>
      </div>
    </header>
  )
}