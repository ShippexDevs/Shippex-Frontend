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
];

function DistributionCard({
    title,
    subtitle,
    data = [],
}) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

            <div>
                <h2 className="text-sm font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                    {subtitle}
                </p>
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

                        {data.slice(0, 6).map((item, index) => (
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

                                <span className="text-xs font-semibold text-slate-800">
                                    {item.percentage}%
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