import { Routes, Route } from "react-router-dom";

import { HomePage } from "../home/pages/HomePage";

import { ProductPage } from "../products/pages/ProductPage";
import { CreateProductPage } from "../products/pages/createProductPage";
import { ProductDetailPage } from "../products/pages/ProductDetailPage";

import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { ProtectedRoute } from "../auth/components/ProtectedRoute";

import { CartPage } from "../cart/pages/CartPage";
import { AdminProductPage } from "../admin/pages/AdminProductPage";
import { CheckoutPage } from "../checkout/pages/CheckoutPage";
import { OrderPage } from "../order/pages/OrderPage";
import { PurchasedProductsPage } from "../purchased-product/pages/PurchasedProductsPage";
import { MainLayout } from "../../layouts/MainLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchased-products"
          element={
            <ProtectedRoute>
              <PurchasedProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/create"
          element={
            <ProtectedRoute>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProductPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
