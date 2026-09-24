import { useEffect, useState } from "react";
import {
    Package,
    ShoppingBag,
    Users,
    DollarSign,
    RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";

import MetricCard from "../components/dashboard/MetricCard"; 
import OrdersOverviewChart from "../components/dashboard/OrderOverviewChart.jsx"; 
import DistributionCard from "../components/dashboard/DistributionCard"; 
import RecentOrders from "../components/dashboard/RecentActivity.jsx"; 
import RecentActivity from "../components/dashboard/RecentActivity";

import {
    getDashboardWidgets,
    getDashboardOverview,
    getRecentOrders,
    getRecentActivity,
} from "../services/dashboardApi";

function AdminHomePage() {

    const [widgets, setWidgets] = useState(null);
    const [overview, setOverview] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activity, setActivity] = useState([]);

    const [days, setDays] = useState(30);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const loadDashboard = async ({
        showRefresh = false,
        overviewDays = days,
    } = {}) => {

        try {

            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const [
                widgetData,
                overviewData,
                orderData,
                activityData,
            ] = await Promise.all([
                getDashboardWidgets(),
                getDashboardOverview(overviewDays),
                getRecentOrders(30),
                getRecentActivity(30),
            ]);

            setWidgets(widgetData);

            setOverview(
                Array.isArray(overviewData)
                    ? overviewData
                    : []
            );

            setOrders(
                Array.isArray(orderData)
                    ? orderData
                    : []
            );

            setActivity(
                Array.isArray(activityData)
                    ? activityData
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to load admin dashboard:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);
            setRefreshing(false);

        }
    };

    useEffect(() => {
        loadDashboard({
            overviewDays: days,
        });
    }, [days]);

    const handleRefresh = async () => {

        await loadDashboard({
            showRefresh: true,
            overviewDays: days,
        });

        toast.success("Dashboard refreshed");
    };

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden">

            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1500px]
                    px-3
                    py-4
                    sm:px-5
                    sm:py-6
                    lg:px-7
                    xl:px-8
                "
            >

                {/* Header */}

                <div
                    className="
                        mb-5
                        flex
                        flex-col
                        gap-4
                        sm:mb-7
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >

                    <div className="min-w-0">

                        <h1
                            className="
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-3xl
                            "
                        >
                            Dashboard
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                leading-5
                                text-slate-500
                            "
                        >
                            Here's what's happening across Shippex.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-xs
                            font-semibold
                            text-slate-600
                            shadow-sm
                            transition
                            hover:border-slate-300
                            hover:bg-slate-50
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            sm:w-auto
                        "
                    >

                        <RefreshCw
                            size={15}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"}

                    </button>

                </div>

                {/* Error */}

                {error && (
                    <div
                        className="
                            mb-5
                            flex
                            flex-col
                            gap-2
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            text-red-600
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <span className="break-words">
                            {error}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                loadDashboard({
                                    overviewDays: days,
                                })
                            }
                            className="
                                self-start
                                font-semibold
                                underline
                                sm:self-auto
                            "
                        >
                            Retry
                        </button>

                    </div>
                )}

                {/* Metrics */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                        sm:gap-4
                        xl:grid-cols-4
                    "
                >

                    <MetricCard
                        title="Total Orders"
                        value={
                            widgets?.orders?.total
                        }
                        change={
                            widgets?.orders
                                ?.changeSinceLastMonth
                        }
                        icon={ShoppingBag}
                    />

                    <MetricCard
                        title="Total Users"
                        value={
                            widgets?.users?.total
                        }
                        change={
                            widgets?.users
                                ?.changeSinceLastMonth
                        }
                        icon={Users}
                    />

                    <MetricCard
                        title="Total Products"
                        value={
                            widgets?.products?.total
                        }
                        change={
                            widgets?.products
                                ?.changeSinceLastMonth
                        }
                        icon={Package}
                    />

                    <MetricCard
                        title="Total Revenue"
                        value={
                            widgets?.revenue?.total
                        }
                        change={
                            widgets?.revenue
                                ?.changeSinceLastMonth
                        }
                        format="currency"
                        icon={DollarSign}
                    />

                </div>

                {/* Main Analytics */}

                <div
                    className="
                        mt-4
                        grid
                        min-w-0
                        grid-cols-1
                        gap-4
                        lg:mt-5
                        lg:gap-5
                        2xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]
                    "
                >

                    <div className="min-w-0">
                        <OrdersOverviewChart
                            data={overview}
                            days={days}
                            setDays={setDays}
                        />
                    </div>

                    <div className="min-w-0">
                        <RecentOrders
                            orders={orders}
                        />
                    </div>

                </div>

                {/* Distribution */}

                <div
                    className="
                        mt-4
                        grid
                        min-w-0
                        grid-cols-1
                        gap-4
                        lg:mt-5
                        lg:grid-cols-2
                        lg:gap-5
                    "
                >

                    <div className="min-w-0">
                        <DistributionCard
                            title="Top Categories"
                            subtitle="Product distribution by category"
                            data={
                                widgets?.productCategoryDistribution ||
                                []
                            }
                        />
                    </div>

                    <div className="min-w-0">
                        <DistributionCard
                            title="Order Status"
                            subtitle="Current order status distribution"
                            data={
                                widgets?.orderStatusDistribution ||
                                []
                            }
                        />
                    </div>

                </div>

                {/* Activity */}

                <div className="mt-4 min-w-0 lg:mt-5">

                    <RecentActivity
                        activity={activity}
                    />

                </div>

            </div>

        </div>
    );
}

function DashboardSkeleton() {

    return (
        <div className="min-h-screen w-full overflow-x-hidden">

            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1500px]
                    px-3
                    py-4
                    sm:px-5
                    sm:py-6
                    lg:px-7
                    xl:px-8
                "
            >

                {/* Header */}

                <div className="mb-5 sm:mb-7">

                    <div
                        className="
                            h-7
                            w-36
                            animate-pulse
                            rounded-lg
                            bg-slate-200
                            sm:h-8
                            sm:w-44
                        "
                    />

                    <div
                        className="
                            mt-2
                            h-4
                            w-64
                            animate-pulse
                            rounded
                            bg-slate-200
                            sm:w-72
                        "
                    />

                </div>

                {/* Metrics */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                        sm:gap-4
                        xl:grid-cols-4
                    "
                >

                    {Array.from({
                        length: 4,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="
                                h-32
                                animate-pulse
                                rounded-2xl
                                bg-white
                                sm:h-36
                            "
                        />
                    ))}

                </div>

                {/* Analytics */}

                <div
                    className="
                        mt-4
                        grid
                        grid-cols-1
                        gap-4
                        lg:mt-5
                        lg:gap-5
                        2xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]
                    "
                >

                    <div
                        className="
                            h-[340px]
                            animate-pulse
                            rounded-2xl
                            bg-white
                            sm:h-[370px]
                        "
                    />

                    <div
                        className="
                            h-[340px]
                            animate-pulse
                            rounded-2xl
                            bg-white
                            sm:h-[370px]
                        "
                    />

                </div>

                {/* Distribution */}

                <div
                    className="
                        mt-4
                        grid
                        grid-cols-1
                        gap-4
                        lg:mt-5
                        lg:grid-cols-2
                        lg:gap-5
                    "
                >

                    <div
                        className="
                            h-64
                            animate-pulse
                            rounded-2xl
                            bg-white
                            sm:h-[280px]
                        "
                    />

                    <div
                        className="
                            h-64
                            animate-pulse
                            rounded-2xl
                            bg-white
                            sm:h-[280px]
                        "
                    />

                </div>

            </div>

        </div>
    );
}

export default AdminHomePage;