import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

import { registerSchema } from "../validations/auth.validation";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    setErrors({});

    registerMutation.mutate(result.data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const clearError = (field: "name" | "email" | "password") => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Decorator */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative z-10 transition-all">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4 ring-8 ring-blue-50/50">
            {/* User Plus Icon SVG */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Tạo tài khoản mới
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Nhanh chóng và hoàn toàn miễn phí
          </p>
        </div>

        {/* Global Error Banner */}
        {registerMutation.isError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-red-700">
              <p className="font-semibold">Đăng ký thất bại</p>
              <p className="text-xs text-red-600/90 mt-0.5">
                Thông tin chưa hợp lệ hoặc email đã được sử dụng. Vui lòng kiểm
                tra lại.
              </p>
            </div>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Họ và tên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                {/* User Icon SVG */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                id="name"
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Địa chỉ Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                {/* Mail Icon SVG */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                {/* Lock Icon SVG */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                className="w-full pl-10 pr-11 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  /* EyeOff Icon SVG */
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                    />
                  </svg>
                ) : (
                  /* Eye Icon SVG */
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full pt-3 mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <span>Đăng ký tài khoản</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-blue-600 hover:text-blue-700 focus:outline-none hover:underline inline-flex items-center gap-1"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
