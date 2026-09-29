import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = [
    "#3674df",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
];

function DistributionCard({
    title,
    subtitle,
    data = [],
    total,
}) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        {subtitle}
                    </p>
                </div>

                {total !== undefined && (
                    <div className="rounded-xl bg-[#087E8B]/[0.07] px-4 py-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#087E8B]">Total Orders</p>
                        <p className="mt-0.5 text-2xl font-bold leading-none tracking-tight text-slate-900">
                            {Number(total).toLocaleString("en-IN")}
                        </p>
                    </div>
                )}
            </div>

            {data.length === 0 ? (
                <div className="flex h-[220px] items-center justify-center text-sm text-slate-400">
                    No data available
                </div>
            ) : (
                <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-3">

                    <div className="h-[190px]">

                        <ResponsiveContainer>
                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="count"
                                    nameKey="label"
                                    innerRadius={52}
                                    outerRadius={76}
                                    paddingAngle={3}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`${entry.label}-${index}`}
                                            fill={
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />

                            </PieChart>
                        </ResponsiveContainer>

                    </div>

                    <div className="space-y-3">

                        {data.map((item, index) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-between gap-2"
                            >

                                <div className="flex min-w-0 items-center gap-2">

                                    <span
                                        className="h-2 w-2 shrink-0 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ],
                                        }}
                                    />

                                    <span className="truncate text-xs text-slate-600">
                                        {item.label}
                                    </span>

                                </div>

                                <span className="shrink-0 text-right text-xs font-semibold text-slate-800">
                                    {item.count} <span className="font-medium text-slate-400">({item.percentage}%)</span>
                                </span>

                            </div>
                        ))}

                    </div>

                </div>
            )}

        </section>
    );
}

export default DistributionCard;
