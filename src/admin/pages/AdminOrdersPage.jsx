import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
    Check,
    ChevronDown,
    Eye,
    Filter,
    Package,
    RefreshCw,
    Ship,
    ShoppingCart,
    User,
} from "lucide-react";

import adminAxios from "../services/adminAxios.js";

const ORDER_STATUSES = [
    "PLACED",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];

function Detail({ label, value }) {
    return (
        <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-1 whitespace-pre-wrap text-sm font-medium text-slate-700">{value || "Not specified"}</p>
        </div>
    );
}

function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("ALL");
    const [statusDrafts, setStatusDrafts] = useState({});
    const [statusNotice, setStatusNotice] = useState({});
    const [statusMenuOpenId, setStatusMenuOpenId] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await adminAxios.get("/api/admin/orders");
            const fetchedOrders = response.data?.data || [];
            setOrders(
                [...fetchedOrders].sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0).getTime();
                    const dateB = new Date(b.createdAt || 0).getTime();
                    return (Number.isNaN(dateB) ? 0 : dateB) - (Number.isNaN(dateA) ? 0 : dateA);
                })
            );
        } catch (fetchError) {
            console.error("Failed to fetch admin orders:", fetchError);
            setOrders([]);
            setError(fetchError.response?.data?.message || "Unable to load orders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (expandedOrderId === null) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [expandedOrderId]);

    const formatDate = (dateString) => {
        if (!dateString) return "Date unavailable";
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return "Date unavailable";
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "Not available";
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return "Not available";
        return date.toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
        });
    };

    const formatCurrency = (amount, currency = "USD") =>
        new Intl.NumberFormat("en-US", {
            style: "currency", currency, minimumFractionDigits: 2,
        }).format(Number(amount || 0));

    const formatStatus = (status) => {
        if (!status) return "Unknown";
        return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    const getStatusDotClass = (status) => {
        switch (status) {
            case "PLACED": return "bg-blue-500";
            case "CONFIRMED": return "bg-emerald-500";
            case "PROCESSING": return "bg-amber-500";
            case "SHIPPED": return "bg-indigo-500";
            case "DELIVERED": return "bg-green-500";
            case "CANCELLED": return "bg-red-500";
            default: return "bg-slate-400";
        }
    };

    const getStatusClasses = (status) => {
        switch (status) {
            case "PLACED": return "border-blue-100 bg-blue-50 text-blue-700";
            case "CONFIRMED": return "border-emerald-100 bg-emerald-50 text-emerald-700";
            case "PROCESSING": return "border-amber-100 bg-amber-50 text-amber-700";
            case "SHIPPED": return "border-indigo-100 bg-indigo-50 text-indigo-700";
            case "DELIVERED": return "border-green-100 bg-green-50 text-green-700";
            case "CANCELLED": return "border-red-100 bg-red-50 text-red-700";
            default: return "border-slate-200 bg-slate-50 text-slate-600";
        }
    };

    const filteredOrders = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const cutoff = dateFilter === "TODAY"
            ? today
            : dateFilter === "LAST_7_DAYS"
                ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                : dateFilter === "LAST_30_DAYS"
                    ? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                    : null;

        return orders.filter((order) => {
            const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
            if (!matchesStatus) return false;
            if (!cutoff) return true;
            const createdAt = new Date(order.createdAt);
            if (Number.isNaN(createdAt.getTime())) return false;
            return dateFilter === "TODAY" ? createdAt >= cutoff : createdAt >= cutoff && createdAt <= now;
        });
    }, [orders, statusFilter, dateFilter]);

    const hasFilters = statusFilter !== "ALL" || dateFilter !== "ALL";
    const clearFilters = () => {
        setStatusFilter("ALL");
        setDateFilter("ALL");
    };

    const getOrderId = (order) => order.id || order.orderNumber;
    const getStatusDraft = (order) => statusDrafts[getOrderId(order)] ?? order.status ?? "PLACED";
    const setStatusDraft = (order, status) => {
        const id = getOrderId(order);
        setStatusDrafts((drafts) => ({ ...drafts, [id]: status }));
        setStatusNotice((notices) => ({ ...notices, [id]: "" }));
        setStatusMenuOpenId(null);
    };

    const cancelStatusChange = (order) => {
        const id = getOrderId(order);
        setStatusDrafts((drafts) => ({ ...drafts, [id]: order.status ?? "PLACED" }));
        setStatusNotice((notices) => ({ ...notices, [id]: "" }));
    };

    const prepareStatusChange = (order) => {
        const id = getOrderId(order);
        if (getStatusDraft(order) === order.status) {
            setStatusNotice((notices) => ({ ...notices, [id]: "Choose a different status first." }));
            return;
        }
        setStatusNotice((notices) => ({ ...notices, [id]: "Status update is ready. Connect the status update API to save this change." }));
    };

    return (
        <div className="min-h-screen">
            <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]"><ShoppingCart size={22} /></div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders</h1>
                            <p className="mt-1 text-sm text-slate-500">View and manage all customer orders.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button type="button" onClick={() => setFilterOpen((open) => !open)} aria-expanded={filterOpen} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${hasFilters ? "border-[#087E8B]/30 bg-[#087E8B]/5 text-[#087E8B]" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                                <Filter size={16} /> Filter <ChevronDown size={15} />
                            </button>
                            {filterOpen && (
                                <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="order-status-filter">Order Status</label>
                                    <select id="order-status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#087E8B]">
                                        <option value="ALL">All</option>
                                        {ORDER_STATUSES.map((status) => <option key={status} value={status}>{formatStatus(status)}</option>)}
                                    </select>
                                    <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="order-date-filter">Date Range</label>
                                    <select id="order-date-filter" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#087E8B]">
                                        <option value="ALL">All Time</option>
                                        <option value="TODAY">Today</option>
                                        <option value="LAST_7_DAYS">Last 7 Days</option>
                                        <option value="LAST_30_DAYS">Last 30 Days</option>
                                    </select>
                                    <button type="button" onClick={clearFilters} disabled={!hasFilters} className="mt-4 w-full rounded-lg px-3 py-2 text-sm font-semibold text-[#087E8B] hover:bg-[#087E8B]/5 disabled:cursor-not-allowed disabled:text-slate-400">Clear Filters</button>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={fetchOrders} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />{loading ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>

                {!loading && error && (
                    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div><p className="text-sm font-semibold text-red-700">Unable to load orders</p><p className="mt-1 text-sm text-red-600">{error}</p></div>
                        <button type="button" onClick={fetchOrders} className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"><RefreshCw size={15} />Try Again</button>
                    </div>
                )}

                {loading && <div className="space-y-4">{[1, 2, 3].map((item) => <div key={item} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><div className="space-y-2"><div className="h-4 w-44 rounded bg-slate-200" /><div className="h-3 w-28 rounded bg-slate-100" /></div><div className="h-7 w-24 rounded-full bg-slate-200" /></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="h-16 rounded-xl bg-slate-100" /><div className="h-16 rounded-xl bg-slate-100" /><div className="h-16 rounded-xl bg-slate-100" /></div></div>)}</div>}

                {!loading && !error && orders.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><ShoppingCart size={26} /></div>
                        <h2 className="mt-5 text-lg font-bold text-slate-800">No orders found</h2>
                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">There are currently no customer orders to display.</p>
                    </div>
                )}

                {!loading && !error && orders.length > 0 && (
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{hasFilters ? "Matching Orders" : "Total Orders"}</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">{filteredOrders.length}</p>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px] text-left">
                                    <thead className="bg-slate-50">
                                        <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                                            <th className="px-5 py-4 font-semibold">Order Number</th>
                                            <th className="px-5 py-4 font-semibold">Customer</th>
                                            <th className="px-5 py-4 font-semibold">Ordered Date</th>
                                            <th className="px-5 py-4 font-semibold">Delivery Port</th>
                                            <th className="px-5 py-4 font-semibold">Total Amount</th>
                                            <th className="px-5 py-4 font-semibold">Current Status</th>
                                            <th className="px-5 py-4 text-right font-semibold">View Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredOrders.map((order) => {
                                            const orderId = getOrderId(order);
                                            const isExpanded = expandedOrderId === orderId;
                                            return (
                                                <Fragment key={orderId}>
                                                    <tr className="hover:bg-slate-50/70">
                                                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">{order.orderNumber || "Unavailable"}</td>
                                                        <td className="px-5 py-4"><p className="font-semibold text-slate-800">{order.customer?.name || order.customer?.username || "Customer unavailable"}</p>{order.customer?.email && <p className="mt-1 text-xs text-slate-500">{order.customer.email}</p>}</td>
                                                        <td className="px-5 py-4 text-sm text-slate-600">{formatDate(order.createdAt)}</td>
                                                        <td className="px-5 py-4 text-sm font-medium text-slate-700">{order.deliveryDestination?.portName || "Not specified"}</td>
                                                        <td className="px-5 py-4 text-sm font-bold text-[#14283D]">{formatCurrency(order.totalAmount, order.currency)}</td>
                                                        <td className="px-5 py-4"><span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(order.status)}`}>{formatStatus(order.status)}</span></td>
                                                        <td className="px-5 py-4 text-right"><button type="button" onClick={() => setExpandedOrderId(isExpanded ? null : orderId)} aria-expanded={isExpanded} className="inline-flex items-center gap-2 rounded-lg border border-[#087E8B]/20 bg-[#087E8B]/5 px-3 py-2 text-sm font-semibold text-[#087E8B] transition hover:bg-[#087E8B]/10"><Eye size={15} />{isExpanded ? "Hide Details" : "View Details"}</button></td>
                                                    </tr>
                                                    {isExpanded && createPortal(
                                                                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950/50 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setExpandedOrderId(null); }}>
                                                                <div role="dialog" aria-modal="true" aria-labelledby={`order-details-title-${orderId}`} className="max-h-[90dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
                                                                    <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                                                                        <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Order Details</p><h2 id={`order-details-title-${orderId}`} className="mt-1 text-lg font-bold text-slate-900">{order.orderNumber || "Order number unavailable"}</h2><p className="mt-1 text-sm text-slate-500">Placed {formatDateTime(order.createdAt)}</p></div>
                                                                        <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(order.status)}`}>{formatStatus(order.status)}</span>
                                                                    </div>
                                                                    <section className="mb-5 rounded-xl border border-[#087E8B]/20 bg-[#087E8B]/[0.03] p-4 sm:p-5">
                                                                        <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-900">Change Status</h3><p className="mt-1 text-sm text-slate-500">Current status: <span className={`ml-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(order.status)}`}>{formatStatus(order.status)}</span></p></div></div>
                                                                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                                                                            <div className="relative w-full sm:max-w-xs">
                                                                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500" id={`new-status-label-${orderId}`}>New Status</label>
                                                                                <button type="button" aria-labelledby={`new-status-label-${orderId}`} aria-haspopup="listbox" aria-expanded={statusMenuOpenId === orderId} onClick={() => setStatusMenuOpenId(statusMenuOpenId === orderId ? null : orderId)} className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left shadow-sm transition hover:border-[#087E8B]/50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#087E8B]/10">
                                                                                    <span className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(getStatusDraft(order))}`} /><span className="text-sm font-semibold text-slate-800">{formatStatus(getStatusDraft(order))}</span></span>
                                                                                    <ChevronDown size={17} className={`text-slate-400 transition-transform ${statusMenuOpenId === orderId ? "rotate-180" : ""}`} />
                                                                                </button>
                                                                                {statusMenuOpenId === orderId && <div role="listbox" aria-labelledby={`new-status-label-${orderId}`} className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-900/5">{ORDER_STATUSES.map((status) => <button key={status} type="button" role="option" aria-selected={getStatusDraft(order) === status} onClick={() => setStatusDraft(order, status)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${getStatusDraft(order) === status ? "bg-[#087E8B]/[0.08] text-[#087E8B]" : "text-slate-700 hover:bg-slate-50"}`}><span className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(status)}`} />{formatStatus(status)}</span>{getStatusDraft(order) === status && <Check size={16} />}</button>)}</div>}
                                                                            </div>
                                                                            <div className="flex gap-2"><button type="button" onClick={() => prepareStatusChange(order)} className="rounded-xl bg-[#087E8B] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066b76] hover:shadow-md">Update Status</button><button type="button" onClick={() => cancelStatusChange(order)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button></div>
                                                                        </div>
                                                                        {statusNotice[orderId] && <p className="mt-3 text-sm text-slate-500" role="status">{statusNotice[orderId]}</p>}
                                                                    </section>
                                                                    <div className="grid gap-5 lg:grid-cols-2">
                                                                        <section className="rounded-xl border border-slate-100 p-4">
                                                                            <div className="mb-4 flex items-center gap-2"><Ship size={17} className="text-[#087E8B]" /><h3 className="font-semibold text-slate-800">Delivery Details</h3></div>
                                                                            <div className="grid gap-4 sm:grid-cols-2"><Detail label="Ship Name" value={order.deliveryDestination?.shipName} /><Detail label="IMO Number" value={order.deliveryDestination?.imoNumber} /><Detail label="Berth Number" value={order.deliveryDestination?.berthNumber} /><Detail label="Port Name" value={order.deliveryDestination?.portName} /></div>
                                                                        </section>
                                                                        <section className="rounded-xl border border-slate-100 p-4">
                                                                            <div className="mb-4 flex items-center gap-2"><User size={17} className="text-[#087E8B]" /><h3 className="font-semibold text-slate-800">Customer</h3></div>
                                                                            <Detail label="Name" value={order.customer?.name || order.customer?.username} /><div className="mt-3"><Detail label="Email" value={order.customer?.email} /></div>
                                                                        </section>
                                                                    </div>
                                                                    <section className="mt-5 rounded-xl border border-slate-100 p-4">
                                                                        <div className="mb-3 flex items-center gap-2"><Package size={17} className="text-[#087E8B]" /><h3 className="font-semibold text-slate-800">Items Ordered</h3></div>
                                                                        {order.items?.length ? <div className="divide-y divide-slate-100">{order.items.map((item, index) => {
                                                                            const quantity = Number(item.quantity || 0);
                                                                            const unitPrice = Number(item.unitPrice || 0);
                                                                            const subtotal = item.subtotal ?? unitPrice * quantity;
                                                                            return <div key={`${item.productId || item.sku || "item"}-${index}`} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_repeat(4,minmax(90px,auto))] sm:items-center"><div><p className="font-semibold text-slate-800">{item.name || "Unnamed item"}</p><p className="mt-1 text-xs text-slate-500">{item.sku || "SKU unavailable"}</p></div><Detail label="Unit" value={item.unit} /><Detail label="Unit Price" value={formatCurrency(unitPrice, item.currency || order.currency)} /><Detail label="Quantity" value={item.quantity} /><Detail label="Subtotal" value={formatCurrency(subtotal, item.currency || order.currency)} /></div>;
                                                                        })}</div> : <p className="text-sm text-slate-500">No items available.</p>}
                                                                    </section>
                                                                    <div className="mt-5 grid gap-4 sm:grid-cols-2"><Detail label="Payment Method" value={formatStatus(order.paymentMethod)} /><Detail label="Estimated Delivery" value={order.estimatedDeliveryDate ? `${formatDate(order.estimatedDeliveryDate)}${order.estimatedDeliveryTime ? ` at ${order.estimatedDeliveryTime}` : ""}` : order.estimatedDeliveryDateTime ? formatDateTime(order.estimatedDeliveryDateTime) : "Not specified"} /></div>
                                                                    {(order.deliveryInstructions || order.orderInstructions) && <div className="mt-4 grid gap-4 sm:grid-cols-2">{order.deliveryInstructions && <Detail label="Delivery Instructions" value={order.deliveryInstructions} />}{order.orderInstructions && <Detail label="Order Instructions" value={order.orderInstructions} />}</div>}

                                                                </div>
                                                                </div>,
                                                                document.body
                                                    )}
                                                </Fragment>
                                            );
                                        })}
                                        {filteredOrders.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center"><p className="font-semibold text-slate-700">No orders match these filters</p><button type="button" onClick={clearFilters} className="mt-2 text-sm font-semibold text-[#087E8B] hover:underline">Clear Filters</button></td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminOrdersPage;
