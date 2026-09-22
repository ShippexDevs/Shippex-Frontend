import { useEffect, useState } from "react";
import {
    Package,
    ChevronRight,
    CalendarDays,
    MapPin,
    RefreshCw,
    ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../layouts/MobileLayout";
import { getMyOrders } from "../api/orderApi.js";

function OrdersPage() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getMyOrders();

            setOrders(response?.data || []);

        } catch (error) {

            console.error("Failed to fetch orders:", error);

            setError(
                error?.message ||
                "Unable to load your orders."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {

        if (!dateString) {
            return "Date unavailable";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatCurrency = (amount, currency = "USD") => {

        const numericAmount = Number(amount || 0);

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
        }).format(numericAmount);
    };

    const formatStatus = (status) => {

        if (!status) {
            return "Unknown";
        }

        return status
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    const getStatusClasses = (status) => {

        switch (status) {

            case "PLACED":
                return "bg-blue-50 text-blue-700 border-blue-100";

            case "CONFIRMED":
                return "bg-emerald-50 text-emerald-700 border-emerald-100";

            case "PROCESSING":
                return "bg-amber-50 text-amber-700 border-amber-100";

            case "SHIPPED":
                return "bg-indigo-50 text-indigo-700 border-indigo-100";

            case "DELIVERED":
                return "bg-green-50 text-green-700 border-green-100";

            case "CANCELLED":
                return "bg-red-50 text-red-700 border-red-100";

            default:
                return "bg-slate-50 text-slate-600 border-slate-200";
        }
    };

    const handleViewDetails = (orderNumber) => {

        if (!orderNumber) {
            return;
        }

        navigate(`/orders/${orderNumber}`);
    };

    return (
        <MobileLayout>

            <div className="min-h-screen bg-[#F5F8FA]">

                <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">

                    {/* Page Header */}

                    <div className="mb-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                                <Package size={22} />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-[#14283D]">
                                    My Orders
                                </h1>

                                <p className="mt-0.5 text-sm text-slate-500">
                                    View your complete order history
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Loading */}

                    {loading && (

                        <div className="space-y-4">

                            {[1, 2, 3].map((item) => (

                                <div
                                    key={item}
                                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                                >

                                    <div className="mb-5 flex justify-between">

                                        <div className="space-y-2">
                                            <div className="h-4 w-40 rounded bg-slate-200" />
                                            <div className="h-3 w-24 rounded bg-slate-100" />
                                        </div>

                                        <div className="h-7 w-20 rounded-full bg-slate-200" />

                                    </div>

                                    <div className="space-y-3">

                                        <div className="h-12 rounded-xl bg-slate-100" />
                                        <div className="h-12 rounded-xl bg-slate-100" />

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}


                    {/* Error */}

                    {!loading && error && (

                        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                                <Package size={22} />
                            </div>

                            <h2 className="text-base font-semibold text-slate-800">
                                Unable to load orders
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={fetchOrders}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#087E8B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b76]"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>

                        </div>

                    )}


                    {/* Empty State */}

                    {!loading && !error && orders.length === 0 && (

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">

                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <ShoppingBag size={25} />
                            </div>

                            <h2 className="text-base font-semibold text-slate-800">
                                No orders yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                                Your completed orders will appear here.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/categories")}
                                className="mt-5 rounded-xl bg-[#087E8B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b76]"
                            >
                                Browse Supplies
                            </button>

                        </div>

                    )}


                    {/* Orders */}

                    {!loading && !error && orders.length > 0 && (

                        <div className="space-y-4">

                            {orders.map((order) => (

                                <div
                                    key={order.id || order.orderNumber}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >

                                    {/* Order Header */}

                                    <div className="border-b border-slate-100 px-5 py-4">

                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                            <div>

                                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                    Order
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-[#14283D]">
                                                    {order.orderNumber || "Order number unavailable"}
                                                </p>

                                            </div>

                                            <span
                                                className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                                    order.status
                                                )}`}
                                            >
                                                {formatStatus(order.status)}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Order Content */}

                                    <div className="px-5 py-4">

                                        {/* Items */}

                                        <div className="mb-5">

                                            <div className="mb-3 flex items-center gap-2">

                                                <ShoppingBag
                                                    size={16}
                                                    className="text-[#087E8B]"
                                                />

                                                <h2 className="text-sm font-semibold text-slate-800">
                                                    Items Ordered
                                                </h2>

                                            </div>

                                            <div className="space-y-2">

                                                {order.items?.map((item, index) => (

                                                    <div
                                                        key={`${item.productId || item.sku || "item"}-${index}`}
                                                        className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3"
                                                    >

                                                        <div className="min-w-0 pr-4">

                                                            <p className="truncate text-sm font-medium text-slate-800">
                                                                {item.name || "Unnamed item"}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate-500">
                                                                {item.unit || "Unit not specified"}
                                                            </p>

                                                        </div>

                                                        <span className="shrink-0 text-sm font-semibold text-slate-700">
                                                            × {item.quantity}
                                                        </span>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>


                                        {/* Order Information */}

                                        <div className="grid gap-3 sm:grid-cols-2">

                                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">

                                                <CalendarDays
                                                    size={17}
                                                    className="shrink-0 text-slate-400"
                                                />

                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                        Ordered
                                                    </p>

                                                    <p className="mt-0.5 text-sm font-medium text-slate-700">
                                                        {formatDate(order.createdAt)}
                                                    </p>
                                                </div>

                                            </div>


                                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">

                                                <MapPin
                                                    size={17}
                                                    className="shrink-0 text-slate-400"
                                                />

                                                <div className="min-w-0">

                                                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                        Delivery Port
                                                    </p>

                                                    <p className="mt-0.5 truncate text-sm font-medium text-slate-700">
                                                        {order.deliveryDestination?.portName ||
                                                            "Not specified"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Footer */}

                                        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Total Amount
                                                </p>

                                                <p className="mt-0.5 text-lg font-bold text-[#14283D]">
                                                    {formatCurrency(
                                                        order.totalAmount,
                                                        order.currency
                                                    )}
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleViewDetails(
                                                        order.orderNumber
                                                    )
                                                }
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087E8B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b76]"
                                            >
                                                View Details
                                                <ChevronRight size={17} />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </MobileLayout>
    );
}

export default OrdersPage;