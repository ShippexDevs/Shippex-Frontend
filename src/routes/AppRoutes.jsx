import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage"));
const CategoryProductsPage = lazy(() => import("../pages/CategoryProductsPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("../pages/OrderDetailsPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const RequestSubmittedPage = lazy(() => import("../pages/RequestSubmittedPage"));
const RequestTrackingPage = lazy(() => import("../pages/RequestTrackingPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));

import ProtectedRoute from "../components/auth/ProtectedRoutes";
import ScrollToTop from "../components/common/ScrollToTop";

const AdminLoginPage = lazy(() => import("../admin/pages/AdminLoginPage"));
const AdminHomePage = lazy(() => import("../admin/pages/AdminHomePage"));
const ChangePasswordPage = lazy(() => import("../admin/pages/ChangePasswordPage"));
import AdminProtectedRoute from "../admin/components/auth/AdminProtectedRoute";
import AdminLayout from "../admin/components/layout/AdminLayout";
const AdminOrdersPage = lazy(() => import("../admin/pages/AdminOrdersPage"));
const AdminUsersPage = lazy(() => import("../admin/pages/AdminUsersPage"));

function AppRoutes() {
    return (
        <>
            <ScrollToTop />

            <Suspense fallback={<div role="status" aria-live="polite" className="flex min-h-[55vh] items-center justify-center gap-3 text-sm font-medium text-slate-500"><span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#087E8B]" />Loading page…</div>}>
            <Routes>
                {/* =========================
                    Public Routes
                ========================== */}

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

                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                {/* =========================
                    Admin Public Routes
                ========================== */}

                <Route
                    path="/admin/login"
                    element={<AdminLoginPage />}
                />

                {/* =========================
                    Protected Admin Routes
                ========================== */}

                <Route element={<AdminProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin/home"
                            element={<AdminHomePage />}
                        />
                        <Route
                            path="/admin/orders"
                            element={<AdminOrdersPage />}
                        />
                        <Route
                            path="/admin/users"
                            element={<AdminUsersPage />}
                        />
                        <Route
                            path="/admin/change-password"
                            element={<ChangePasswordPage />}
                        />
                    </Route>
                </Route>

                {/* =========================
                    Protected Customer Routes
                ========================== */}

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/cart"
                        element={<CartPage />}
                    />

                    {/* Orders History */}

                    <Route
                        path="/orders"
                        element={<OrdersPage />}
                    />

                    {/* Individual Order Details */}

                    <Route
                        path="/orders/:orderNumber"
                        element={<OrderDetailsPage />}
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

                    {/* Existing Request Tracking Flow */}

                    <Route
                        path="/requests/:requestId"
                        element={<RequestTrackingPage />}
                    />
                </Route>
            </Routes>
            </Suspense>
        </>
    );
}

export default AppRoutes;
