import { useEffect, useState } from "react";
import {
    ShoppingCart,
    RefreshCw,
    Package,
    CalendarDays,
    MapPin,
    Ship,
    CreditCard,
    User,
} from "lucide-react";

import adminAxios from "../services/adminAxios.js";

function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await adminAxios.get(
                "/api/admin/orders"
            );

            setOrders(response.data?.data || []);
        } catch (error) {
            console.error(
                "Failed to fetch admin orders:",
                error
            );

            setOrders([]);

            setError(
                error.response?.data?.message ||
                    "Unable to load orders. Please try again."
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

    const formatDateTime = (dateString) => {
        if (!dateString) {
            return "Not available";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (
        amount,
        currency = "USD"
    ) => {
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
            .replace(
                /\b\w/g,
                (letter) => letter.toUpperCase()
            );
    };

    const getStatusClasses = (status) => {
        switch (status) {
            case "PLACED":
                return "border-blue-100 bg-blue-50 text-blue-700";

            case "CONFIRMED":
                return "border-emerald-100 bg-emerald-50 text-emerald-700";

            case "PROCESSING":
                return "border-amber-100 bg-amber-50 text-amber-700";

            case "SHIPPED":
                return "border-indigo-100 bg-indigo-50 text-indigo-700";

            case "DELIVERED":
                return "border-green-100 bg-green-50 text-green-700";

            case "CANCELLED":
                return "border-red-100 bg-red-50 text-red-700";

            default:
                return "border-slate-200 bg-slate-50 text-slate-600";
        }
    };

    return (
        <div className="min-h-screen">
            <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

                {/* Page Header */}

                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">

                    <div>
                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                                <ShoppingCart size={22} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Orders
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    View and manage all customer orders.
                                </p>
                            </div>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={fetchOrders}
                        disabled={loading}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-slate-600
                            shadow-sm
                            transition
                            hover:border-slate-300
                            hover:bg-slate-50
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        <RefreshCw
                            size={16}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        {loading
                            ? "Refreshing..."
                            : "Refresh"}
                    </button>

                </div>

                {/* Error */}

                {!loading && error && (
                    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-semibold text-red-700">
                                Unable to load orders
                            </p>

                            <p className="mt-1 text-sm text-red-600">
                                {error}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={fetchOrders}
                            className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            <RefreshCw size={15} />
                            Try Again
                        </button>

                    </div>
                )}

                {/* Loading */}

                {loading && (
                    <div className="space-y-4">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <div className="h-4 w-44 rounded bg-slate-200" />
                                        <div className="h-3 w-28 rounded bg-slate-100" />
                                    </div>

                                    <div className="h-7 w-24 rounded-full bg-slate-200" />
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                    <div className="h-16 rounded-xl bg-slate-100" />
                                    <div className="h-16 rounded-xl bg-slate-100" />
                                    <div className="h-16 rounded-xl bg-slate-100" />
                                </div>

                                <div className="mt-4 space-y-2">
                                    <div className="h-12 rounded-xl bg-slate-100" />
                                    <div className="h-12 rounded-xl bg-slate-100" />
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* Empty */}

                {!loading &&
                    !error &&
                    orders.length === 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <ShoppingCart size={26} />
                            </div>

                            <h2 className="mt-5 text-lg font-bold text-slate-800">
                                No orders found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                There are currently no customer orders to display.
                            </p>

                        </div>
                    )}

                {/* Orders */}

                {!loading &&
                    !error &&
                    orders.length > 0 && (
                        <div className="space-y-4">

                            {/* Summary */}

                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Total Orders
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-slate-900">
                                            {orders.length}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                                        <Package size={19} />
                                    </div>

                                </div>

                            </div>

                            {orders.map((order) => (
                                <div
                                    key={
                                        order.id ||
                                        order.orderNumber
                                    }
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >

                                    {/* Order Header */}

                                    <div className="border-b border-slate-100 px-5 py-4">

                                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                                    Order
                                                </p>

                                                <p className="mt-1 text-base font-bold text-[#14283D]">
                                                    {order.orderNumber ||
                                                        "Order number unavailable"}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Created{" "}
                                                    {formatDateTime(
                                                        order.createdAt
                                                    )}
                                                </p>
                                            </div>

                                            <span
                                                className={`
                                                    inline-flex
                                                    w-fit
                                                    items-center
                                                    rounded-full
                                                    border
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    font-semibold
                                                    ${getStatusClasses(
                                                        order.status
                                                    )}
                                                `}
                                            >
                                                {formatStatus(
                                                    order.status
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Main information */}

                                    <div className="px-5 py-5">

                                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

                                            {/* User */}

                                            <div className="rounded-xl bg-slate-50 p-3.5">

                                                <div className="flex items-center gap-2">

                                                    <User
                                                        size={16}
                                                        className="text-slate-400"
                                                    />

                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                        Customer
                                                    </p>

                                                </div>

                                                <p className="mt-2 truncate text-sm font-semibold text-slate-700">
                                                    {order.userId ||
                                                        "Not available"}
                                                </p>

                                            </div>

                                            {/* Order Date */}

                                            <div className="rounded-xl bg-slate-50 p-3.5">

                                                <div className="flex items-center gap-2">

                                                    <CalendarDays
                                                        size={16}
                                                        className="text-slate-400"
                                                    />

                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                        Ordered
                                                    </p>

                                                </div>

                                                <p className="mt-2 text-sm font-semibold text-slate-700">
                                                    {formatDate(
                                                        order.createdAt
                                                    )}
                                                </p>

                                            </div>

                                            {/* Delivery Port */}

                                            <div className="rounded-xl bg-slate-50 p-3.5">

                                                <div className="flex items-center gap-2">

                                                    <MapPin
                                                        size={16}
                                                        className="text-slate-400"
                                                    />

                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                        Delivery Port
                                                    </p>

                                                </div>

                                                <p className="mt-2 truncate text-sm font-semibold text-slate-700">
                                                    {order.deliveryDestination
                                                        ?.portName ||
                                                        "Not specified"}
                                                </p>

                                            </div>

                                            {/* Total */}

                                            <div className="rounded-xl bg-slate-50 p-3.5">

                                                <div className="flex items-center gap-2">

                                                    <CreditCard
                                                        size={16}
                                                        className="text-slate-400"
                                                    />

                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                        Total
                                                    </p>

                                                </div>

                                                <p className="mt-2 text-sm font-bold text-[#14283D]">
                                                    {formatCurrency(
                                                        order.totalAmount,
                                                        order.currency
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Delivery */}

                                        <div className="mt-4 rounded-xl border border-slate-100 bg-white">

                                            <div className="border-b border-slate-100 px-4 py-3">

                                                <div className="flex items-center gap-2">

                                                    <Ship
                                                        size={17}
                                                        className="text-[#087E8B]"
                                                    />

                                                    <h2 className="text-sm font-semibold text-slate-800">
                                                        Delivery Details
                                                    </h2>

                                                </div>

                                            </div>

                                            <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">

                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                        Ship Name
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {order.deliveryDestination
                                                            ?.shipName ||
                                                            "Not specified"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                        IMO Number
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {order.deliveryDestination
                                                            ?.imoNumber ||
                                                            "Not specified"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                        Berth
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {order.deliveryDestination
                                                            ?.berthNumber ||
                                                            "Not specified"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                        Port
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {order.deliveryDestination
                                                            ?.portName ||
                                                            "Not specified"}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                        {/* Items */}

                                        <div className="mt-4">

                                            <div className="mb-3 flex items-center gap-2">

                                                <Package
                                                    size={17}
                                                    className="text-[#087E8B]"
                                                />

                                                <h2 className="text-sm font-semibold text-slate-800">
                                                    Items Ordered
                                                </h2>

                                            </div>

                                            <div className="overflow-hidden rounded-xl border border-slate-100">

                                                {order.items?.length > 0 ? (
                                                    <div className="divide-y divide-slate-100">

                                                        {order.items.map(
                                                            (
                                                                item,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={`${item.productId || item.sku || "item"}-${index}`}
                                                                    className="flex flex-col gap-2 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                                                >

                                                                    <div className="min-w-0">

                                                                        <p className="truncate text-sm font-semibold text-slate-800">
                                                                            {item.name ||
                                                                                "Unnamed item"}
                                                                        </p>

                                                                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

                                                                            <span>
                                                                                SKU:{" "}
                                                                                {item.sku ||
                                                                                    "N/A"}
                                                                            </span>

                                                                            <span>
                                                                                Unit:{" "}
                                                                                {item.unit ||
                                                                                    "N/A"}
                                                                            </span>

                                                                            <span>
                                                                                Unit Price:{" "}
                                                                                {formatCurrency(
                                                                                    item.unitPrice,
                                                                                    item.currency ||
                                                                                        order.currency
                                                                                )}
                                                                            </span>

                                                                        </div>

                                                                    </div>

                                                                    <div className="shrink-0 text-sm font-bold text-slate-700">
                                                                        ×{" "}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </div>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-6 text-center text-sm text-slate-500">
                                                        No items available.
                                                    </div>
                                                )}

                                            </div>

                                        </div>

                                        {/* Payment / Instructions */}

                                        <div className="mt-4 grid gap-3 lg:grid-cols-2">

                                            <div className="rounded-xl bg-slate-50 p-4">

                                                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                    Payment Method
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                                    {formatStatus(
                                                        order.paymentMethod
                                                    )}
                                                </p>

                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-4">

                                                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                    Estimated Delivery
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                                    {order.estimatedDeliveryDate
                                                        ? `${formatDate(
                                                              order.estimatedDeliveryDate
                                                          )}${
                                                              order.estimatedDeliveryTime
                                                                  ? ` at ${order.estimatedDeliveryTime}`
                                                                  : ""
                                                          }`
                                                        : "Not specified"}
                                                </p>

                                            </div>

                                        </div>

                                        {order.deliveryInstructions && (
                                            <div className="mt-3 rounded-xl border border-slate-100 bg-white p-4">

                                                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                    Delivery Instructions
                                                </p>

                                                <p className="mt-1 text-sm text-slate-600">
                                                    {
                                                        order.deliveryInstructions
                                                    }
                                                </p>

                                            </div>
                                        )}

                                        {order.orderInstructions && (
                                            <div className="mt-3 rounded-xl border border-slate-100 bg-white p-4">

                                                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                                    Order Instructions
                                                </p>

                                                <p className="mt-1 text-sm text-slate-600">
                                                    {
                                                        order.orderInstructions
                                                    }
                                                </p>

                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

            </main>
        </div>
    );
}

export default AdminOrdersPage;