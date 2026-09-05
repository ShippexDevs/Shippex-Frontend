import {
    ArrowDownRight,
    ArrowUpRight,
} from "lucide-react";

function MetricCard({
    title,
    value,
    change,
    icon: Icon,
    format = "number",
}) {
    const numericChange = Number(change ?? 0);

    const positive = numericChange >= 0;

    const formattedValue =
        format === "currency"
            ? `$${Number(value ?? 0).toLocaleString(
                  "en-US",
                  {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                  }
              )}`
            : Number(value ?? 0).toLocaleString();

    const formattedChange =
        format === "currency"
            ? `$${Math.abs(numericChange).toLocaleString(
                  "en-US",
                  {
                      maximumFractionDigits: 2,
                  }
              )}`
            : Math.abs(numericChange).toLocaleString();

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-xs font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        {formattedValue}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={20} />
                </div>

            </div>

            <div
                className={`
                    mt-4
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    font-medium
                    ${positive
                        ? "text-emerald-600"
                        : "text-red-500"
                    }
                `}
            >
                {positive ? (
                    <ArrowUpRight size={14} />
                ) : (
                    <ArrowDownRight size={14} />
                )}

                <span>
                    {formattedChange}
                </span>

                <span className="font-normal text-slate-400">
                    vs last month
                </span>
            </div>

        </div>
    );
}

export default MetricCard;