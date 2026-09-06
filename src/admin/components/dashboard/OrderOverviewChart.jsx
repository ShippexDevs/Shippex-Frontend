import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function OrdersOverviewChart({
    data = [],
    days,
    setDays,
}) {
    const chartData = data.map((item) => ({
        date: item.date,
        orders: item.orderCount,
    }));

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Orders Overview
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        Daily orders received
                    </p>
                </div>

                <select
                    value={days}
                    onChange={(event) =>
                        setDays(Number(event.target.value))
                    }
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        bg-slate-50
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-slate-600
                        outline-none
                        focus:border-blue-400
                    "
                >
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                    <option value={365}>Last year</option>
                </select>

            </div>

            <div className="h-[280px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >

                        <defs>
                            <linearGradient
                                id="ordersGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#3674df"
                                    stopOpacity={0.25}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#3674df"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) =>
                                new Date(
                                    `${value}T00:00:00`
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                    }
                                )
                            }
                            tick={{
                                fontSize: 11,
                                fill: "#94a3b8",
                            }}
                            axisLine={false}
                            tickLine={false}
                            minTickGap={30}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{
                                fontSize: 11,
                                fill: "#94a3b8",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow:
                                    "0 8px 25px rgba(15,23,42,0.08)",
                            }}
                            labelFormatter={(value) =>
                                new Date(
                                    `${value}T00:00:00`
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#3674df"
                            strokeWidth={2.5}
                            fill="url(#ordersGradient)"
                            activeDot={{
                                r: 5,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </section>
    );
}

export default OrdersOverviewChart;