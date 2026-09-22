import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    MapPin,
    Package,
    RefreshCw,
    Ship,
    ShoppingBag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import MobileLayout from "../layouts/MobileLayout";
import { getMyOrders } from "../api/orderApi.js";

function OrderDetailsPage() {

    const navigate = useNavigate();
    const { orderNumber } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrder = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getMyOrders();

            const orders = response?.data || [];

            const matchedOrder = orders.find(
                (item) => item.orderNumber === orderNumber
            );

            if (!matchedOrder) {
                setError("Order details could not be found.");
                setOrder(null);
                return;
            }

            setOrder(matchedOrder);

        } catch (error) {

            console.error("Failed to fetch order details:", error);

            setError(
                error?.message ||
                "Unable to load order details."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderNumber]);

    const formatDate = (dateString) => {

        if (!dateString) {
            return "Not specified";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Not specified";
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (timeString) => {

        if (!timeString) {
            return "Not specified";
        }

        const [hours, minutes] = timeString.split(":");

        const date = new Date();

        date.setHours(
            Number(hours),
            Number(minutes),
            0,
            0
        );

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount, currency = "USD") => {

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
        }).format(Number(amount || 0));
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

    return (
        <MobileLayout>

            <div className="min-h-screen bg-[#F5F8FA]">

                <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">

                    {/* Back Button */}

                    <button
                        type="button"
                        onClick={() => navigate("/orders")}
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#087E8B]"
                    >
                        <ArrowLeft size={17} />
                        Back to Orders
                    </button>


                    {/* Loading */}

                    {loading && (

                        <div className="space-y-4">

                            <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">

                                <div className="mb-6 flex justify-between">

                                    <div className="space-y-2">
                                        <div className="h-5 w-48 rounded bg-slate-200" />
                                        <div className="h-3 w-32 rounded bg-slate-100" />
                                    </div>

                                    <div className="h-7 w-24 rounded-full bg-slate-200" />

                                </div>

                                <div className="space-y-3">

                                    <div className="h-16 rounded-xl bg-slate-100" />
                                    <div className="h-16 rounded-xl bg-slate-100" />
                                    <div className="h-16 rounded-xl bg-slate-100" />

                                </div>

                            </div>

                        </div>

                    )}


                    {/* Error */}

                    {!loading && error && (

                        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                                <Package size={22} />
                            </div>

                            <h1 className="text-lg font-semibold text-slate-800">
                                Order unavailable
                            </h1>

                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                {error}
                            </p>

                            <div className="mt-5 flex justify-center gap-3">

                                <button
                                    type="button"
                                    onClick={() => navigate("/orders")}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Back to Orders
                                </button>

                                <button
                                    type="button"
                                    onClick={fetchOrder}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#087E8B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b76]"
                                >
                                    <RefreshCw size={16} />
                                    Try Again
                                </button>

                            </div>

                        </div>

                    )}


                    {/* Order Details */}

                    {!loading && !error && order && (

                        <div className="space-y-4">

                            {/* Header Card */}

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                                                <Package size={22} />
                                            </div>

                                            <div>

                                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                    Order Details
                                                </p>

                                                <h1 className="mt-1 text-lg font-bold text-[#14283D]">
                                                    {order.orderNumber}
                                                </h1>

                                            </div>

                                        </div>

                                    </div>

                                    <span
                                        className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                            order.status
                                        )}`}
                                    >
                                        {formatStatus(order.status)}
                                    </span>

                                </div>

                            </section>


                            {/* Items */}

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-4 flex items-center gap-2">

                                    <ShoppingBag
                                        size={18}
                                        className="text-[#087E8B]"
                                    />

                                    <h2 className="text-base font-bold text-[#14283D]">
                                        Items Ordered
                                    </h2>

                                </div>

                                <div className="space-y-3">

                                    {order.items?.map((item, index) => (

                                        <div
                                            key={`${item.productId || item.sku || "item"}-${index}`}
                                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                        >

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="min-w-0">

                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {item.name || "Unnamed item"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {item.unit || "Unit not specified"}
                                                    </p>

                                                    {item.sku && (
                                                        <p className="mt-1 text-xs text-slate-400">
                                                            SKU: {item.sku}
                                                        </p>
                                                    )}

                                                </div>

                                                <div className="shrink-0 text-right">

                                                    <p className="text-sm font-semibold text-slate-700">
                                                        × {item.quantity}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {formatCurrency(
                                                            item.subtotal,
                                                            order.currency
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </section>


                            {/* Delivery Destination */}

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-4 flex items-center gap-2">

                                    <MapPin
                                        size={18}
                                        className="text-[#087E8B]"
                                    />

                                    <h2 className="text-base font-bold text-[#14283D]">
                                        Delivery Destination
                                    </h2>

                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">

                                    <InfoCard
                                        label="Ship Name"
                                        value={
                                            order.deliveryDestination?.shipName ||
                                            "Not specified"
                                        }
                                    />

                                    <InfoCard
                                        label="IMO Number"
                                        value={
                                            order.deliveryDestination?.imoNumber ||
                                            "Not specified"
                                        }
                                    />

                                    <InfoCard
                                        label="Berth Number"
                                        value={
                                            order.deliveryDestination?.berthNumber ||
                                            "Not specified"
                                        }
                                    />

                                    <InfoCard
                                        label="Port"
                                        value={
                                            order.deliveryDestination?.portName ||
                                            "Not specified"
                                        }
                                    />

                                </div>

                            </section>


                            {/* Delivery Information */}

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-4 flex items-center gap-2">

                                    <Clock3
                                        size={18}
                                        className="text-[#087E8B]"
                                    />

                                    <h2 className="text-base font-bold text-[#14283D]">
                                        Delivery Information
                                    </h2>

                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">

                                    <InfoCard
                                        label="Estimated Delivery Date"
                                        value={formatDate(
                                            order.estimatedDeliveryDate
                                        )}
                                        icon={<CalendarDays size={16} />}
                                    />

                                    <InfoCard
                                        label="Estimated Delivery Time"
                                        value={formatTime(
                                            order.estimatedDeliveryTime
                                        )}
                                        icon={<Clock3 size={16} />}
                                    />

                                </div>

                            </section>


                            {/* Instructions */}

                            {(order.deliveryInstructions ||
                                order.orderInstructions) && (

                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                    <h2 className="mb-4 text-base font-bold text-[#14283D]">
                                        Instructions
                                    </h2>

                                    <div className="space-y-3">

                                        {order.deliveryInstructions && (

                                            <div className="rounded-xl bg-slate-50 p-4">

                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Delivery Instructions
                                                </p>

                                                <p className="mt-1.5 text-sm leading-6 text-slate-700">
                                                    {order.deliveryInstructions}
                                                </p>

                                            </div>

                                        )}

                                        {order.orderInstructions && (

                                            <div className="rounded-xl bg-slate-50 p-4">

                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Order Instructions
                                                </p>

                                                <p className="mt-1.5 text-sm leading-6 text-slate-700">
                                                    {order.orderInstructions}
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                </section>

                            )}


                            {/* Payment + Order Date */}

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="grid gap-3 sm:grid-cols-2">

                                    <InfoCard
                                        label="Payment Method"
                                        value={formatStatus(
                                            order.paymentMethod
                                        )}
                                        icon={<CreditCard size={16} />}
                                    />

                                    <InfoCard
                                        label="Order Placed"
                                        value={formatDate(order.createdAt)}
                                        icon={<CalendarDays size={16} />}
                                    />

                                </div>

                            </section>


                            {/* Total */}

                            <section className="rounded-2xl border border-[#087E8B]/20 bg-[#087E8B]/5 p-5 sm:p-6">

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Total Amount
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-[#14283D]">
                                            {formatCurrency(
                                                order.totalAmount,
                                                order.currency
                                            )}
                                        </p>

                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#087E8B]/10 text-[#087E8B]">
                                        <CheckCircle2 size={23} />
                                    </div>

                                </div>

                            </section>

                        </div>

                    )}

                </main>

            </div>

        </MobileLayout>
    );
}


function InfoCard({
    label,
    value,
    icon,
}) {

    return (
        <div className="rounded-xl bg-slate-50 px-4 py-3">

            <div className="flex items-center gap-2">

                {icon && (
                    <span className="text-slate-400">
                        {icon}
                    </span>
                )}

                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {label}
                </p>

            </div>

            <p className="mt-1.5 break-words text-sm font-medium text-slate-700">
                {value}
            </p>

        </div>
    );
}

export default OrderDetailsPage;