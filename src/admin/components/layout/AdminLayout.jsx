import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Package,
    Tags,
    ShoppingCart,
    ClipboardList,
    Ship,
    CreditCard,
    Star,
    UserCircle,
    KeyRound,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";

import {
    clearAdminAuth,
    getAdminUsername,
} from "../../services/tokenStorage";

const navigation = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/home",
    },
    {
        label: "Users",
        icon: Users,
        path: "/admin/users",
    },
    {
        label: "Products",
        icon: Package,
        path: "/admin/products",
    },
    {
        label: "Categories",
        icon: Tags,
        path: "/admin/categories",
    },
    {
        label: "Orders",
        icon: ShoppingCart,
        path: "/admin/orders",
    },
    {
        label: "Requests",
        icon: ClipboardList,
        path: "/admin/requests",
    },
    {
        label: "Shipments",
        icon: Ship,
        path: "/admin/shipments",
    },
    {
        label: "Payments",
        icon: CreditCard,
        path: "/admin/payments",
    },
    {
        label: "Reviews",
        icon: Star,
        path: "/admin/reviews",
    },
];

const systemNavigation = [
    {
        label: "Admin Profile",
        icon: UserCircle,
        path: "/admin/profile",
    },
    {
        label: "Change Password",
        icon: KeyRound,
        path: "/admin/change-password",
    },
];

function AdminLayout() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const username = getAdminUsername() || "Administrator";

    const handleLogout = () => {
        clearAdminAuth();

        navigate("/admin/login", {
            replace: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa] text-slate-900">

            {/* Mobile overlay */}

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-slate-950/40
                        lg:hidden
                    "
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    flex
                    w-[250px]
                    flex-col
                    bg-[#14283d]
                    text-white
                    shadow-2xl
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* Logo */}

                <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/home")}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                            <Ship size={20} />
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-bold">
                                Shippex
                            </p>

                            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                                Admin
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <X size={19} />
                    </button>

                </div>

                {/* Navigation */}

                <nav className="flex-1 overflow-y-auto px-3 py-5">

                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Management
                    </p>

                    <div className="space-y-1">

                        {navigation.map((item) => (
                            <SidebarItem
                                key={item.label}
                                item={item}
                                onNavigate={() => setSidebarOpen(false)}
                            />
                        ))}

                    </div>

                    <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        System
                    </p>

                    <div className="space-y-1">

                        {systemNavigation.map((item) => (
                            <SidebarItem
                                key={item.label}
                                item={item}
                                onNavigate={() => setSidebarOpen(false)}
                            />
                        ))}

                    </div>

                </nav>

                {/* Logout */}

                <div className="border-t border-white/10 p-3">

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-red-500/10
                            hover:text-red-300
                        "
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </aside>

            {/* Main */}

            <div className="lg:pl-[250px]">

                {/* Topbar */}

                <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6">

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="
                            rounded-xl
                            p-2
                            text-slate-600
                            hover:bg-slate-100
                            lg:hidden
                        "
                    >
                        <Menu size={21} />
                    </button>

                    <div className="hidden lg:block">
                        <p className="text-sm font-medium text-slate-400">
                            Admin Console
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-3">

                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold text-slate-800">
                                {username}
                            </p>

                            <p className="text-xs text-slate-400">
                                Administrator
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                            {username.charAt(0).toUpperCase()}
                        </div>

                    </div>

                </header>

                <main>
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

function SidebarItem({ item, onNavigate }) {
    const navigate = useNavigate();

    const Icon = item.icon;

    const isDashboard = item.path === "/admin/home";

    return (
        <button
            type="button"
            onClick={() => {
                navigate(item.path);
                onNavigate();
            }}
            className={`
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-left
                text-sm
                transition
                ${
                    isDashboard
                        ? "bg-[#3674df] text-white shadow-lg shadow-blue-950/20"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                }
            `}
        >
            <Icon size={17} />

            <span className="flex-1">
                {item.label}
            </span>

            <ChevronRight
                size={14}
                className={`
                    opacity-0
                    transition
                    group-hover:opacity-50
                    ${isDashboard ? "hidden" : ""}
                `}
            />
        </button>
    );
}

export default AdminLayout;