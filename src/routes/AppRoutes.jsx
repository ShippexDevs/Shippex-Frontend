import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import ProfilePage from "../pages/ProfilePage";
import CheckoutPage from "../pages/CheckoutPage";
import RequestSubmittedPage from "../pages/RequestSubmittedPage";
import RequestTrackingPage from "../pages/RequestTrackingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/auth/ProtectedRoutes";

import ScrollToTop from "../components/common/ScrollToTop";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/categories"
          element={<CategoriesPage />}
        />

        <Route
          path="/categories/:slug"
          element={<CategoryProductsPage />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/request-submitted"
            element={<RequestSubmittedPage />}
          />

          <Route
            path="/requests/:requestId"
            element={<RequestTrackingPage />}
          />

        </Route>

      </Routes>

    </>
  );
}

export default AppRoutes;
