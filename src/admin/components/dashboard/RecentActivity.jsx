import {
    ClipboardList,
    Package,
    UserPlus,
    UserRound,
} from "lucide-react";

const activityConfig = {
    ORDER_PLACED: {
        icon: ClipboardList,
        className: "bg-blue-50 text-blue-600",
    },
    ORDER_UPDATED: {
        icon: ClipboardList,
        className: "bg-amber-50 text-amber-600",
    },
    PRODUCT_CREATED: {
        icon: Package,
        className: "bg-violet-50 text-violet-600",
    },
    PRODUCT_UPDATED: {
        icon: Package,
        className: "bg-violet-50 text-violet-600",
    },
    USER_REGISTERED: {
        icon: UserPlus,
        className: "bg-emerald-50 text-emerald-600",
    },
    USER_UPDATED: {
        icon: UserRound,
        className: "bg-slate-100 text-slate-600",
    },
};

function RecentActivity({ activity = [] }) {
    const visibleActivity = activity.slice(0, 8);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

            <div className="mb-5">
                <h2 className="text-sm font-bold text-slate-900">
                    Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                    Latest changes across Shippex
                </p>
            </div>

            {visibleActivity.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">
                    No recent activity
                </div>
            ) : (
                <div className="divide-y divide-slate-100">

                    {visibleActivity.map(
                        (item, index) => {

                            const config =
                                activityConfig[
                                    item.type
                                ] ||
                                {
                                    icon: ClipboardList,
                                    className:
                                        "bg-slate-100 text-slate-600",
                                };

                            const Icon =
                                config.icon;

                            return (
                                <div
                                    key={`${item.type}-${item.occurredAt}-${index}`}
                                    className="flex items-center gap-3 py-3.5"
                                >

                                    <div
                                        className={`
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            ${config.className}
                                        `}
                                    >
                                        <Icon size={16} />
                                    </div>

                                    <p className="min-w-0 flex-1 text-xs leading-5 text-slate-600">
                                        {item.description}
                                    </p>

                                    <span className="shrink-0 text-[10px] text-slate-400">
                                        {formatTime(
                                            item.occurredAt
                                        )}
                                    </span>

                                </div>
                            );
                        }
                    )}

                </div>
            )}

        </section>
    );
}

function formatTime(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    const diff =
        Date.now() - date.getTime();

    const minutes = Math.floor(
        diff / 60000
    );

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(
        minutes / 60
    );

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(
        hours / 24
    );

    if (days < 30) {
        return `${days}d ago`;
    }

    return date.toLocaleDateString();
}

export default RecentActivity;