import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  ShoppingCart,
  ClipboardList,
  UserCircle,
  LogOut,
  Menu,
  X,
  Ship,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Categories",
    icon: LayoutGrid,
    path: "/categories",
  },
  {
    label: "Cart",
    icon: ShoppingCart,
    path: "/cart",
  },
  {
    label: "Orders",
    icon: ClipboardList,
    path: "/orders",
  },
  {
    label: "Profile",
    icon: UserCircle,
    path: "/profile",
  },
];

function MobileLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const username =
    user?.name ||
    user?.username ||
    "Crew Member";

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-slate-900">

      {/* Mobile overlay */}

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-slate-950/40
            lg:hidden
          "
        />
      )}

      {/* Mobile drawer */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[280px]
          flex-col
          bg-[#14283D]
          text-white
          shadow-2xl
          transition-transform
          duration-300
          lg:hidden
          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Drawer header */}

        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">

          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Ship size={21} />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold">
                Shippex
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Crew Supply
              </p>
            </div>

          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={19} />
          </button>

        </div>

        {/* User */}

        <div className="border-b border-white/10 px-5 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 font-bold">
              {username
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold">
                {username}
              </p>

              <p className="text-xs text-slate-400">
                Ship Crew
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 py-5">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Navigation
          </p>

          <div className="space-y-1">

            {navigation.map((item) => (
              <CustomerNavItem
                key={item.path}
                item={item}
                active={isActive(item.path)}
                onClick={() =>
                  handleNavigate(item.path)
                }
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

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* Desktop / Mobile header */}

      <header
        className="
          sticky
          top-0
          z-30
          border-b
          border-slate-200
          bg-white/95
          shadow-[0_1px_4px_rgba(15,23,42,0.03)]
          backdrop-blur-md
        "
      >

        <div
          className="
            mx-auto
            flex
            h-[70px]
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* Mobile menu */}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="
              rounded-xl
              p-2
              text-slate-600
              transition
              hover:bg-slate-100
              lg:hidden
            "
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-2.5
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#14283D]
                text-white
              "
            >
              <Ship size={19} />
            </div>

            <div className="text-left">

              <p className="text-base font-bold tracking-tight text-[#14283D]">
                Shippex
              </p>

              <p className="hidden text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
                Crew Supply
              </p>

            </div>

          </button>

          {/* Desktop navigation */}

          <nav className="hidden items-center gap-1 lg:flex">

            {navigation.map((item) => (
              <DesktopNavItem
                key={item.path}
                item={item}
                active={isActive(item.path)}
                onClick={() =>
                  handleNavigate(item.path)
                }
              />
            ))}

          </nav>

          {/* User */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-slate-800">
                {username}
              </p>

              <p className="text-xs text-slate-400">
                Ship Crew
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-sm
                font-bold
                text-slate-600
                transition
                hover:bg-slate-200
              "
              aria-label="Open profile"
            >
              {username
                .charAt(0)
                .toUpperCase()}
            </button>

            {/* Desktop logout */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-3
                py-2
                text-sm
                font-medium
                text-slate-600
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
                sm:flex
              "
            >
              <LogOut size={16} />

              <span className="hidden xl:inline">
                Logout
              </span>
            </button>

          </div>

        </div>

      </header>

      {/* Page content */}

      <main className="min-h-[calc(100vh-70px)] pb-24 lg:pb-8">
        {children}
      </main>

      {/* Mobile bottom navigation */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-30
          border-t
          border-slate-200
          bg-white/95
          px-2
          py-2
          shadow-[0_-4px_15px_rgba(15,23,42,0.06)]
          backdrop-blur-md
          lg:hidden
        "
      >

        <div className="mx-auto flex max-w-md items-center justify-around">

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() =>
                  handleNavigate(item.path)
                }
                className={`
                  flex
                  min-w-[60px]
                  flex-col
                  items-center
                  gap-1
                  rounded-xl
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  transition
                  ${
                    active
                      ? "text-[#087E8B]"
                      : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    transition
                    ${
                      active
                        ? "bg-[#087E8B]/10"
                        : ""
                    }
                  `}
                >
                  <Icon size={18} />
                </div>

                <span>
                  {item.label}
                </span>

              </button>
            );
          })}

        </div>

      </nav>

    </div>
  );
}

function CustomerNavItem({
  item,
  active,
  onClick,
}) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
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
          active
            ? "bg-[#3674DF] text-white shadow-lg shadow-blue-950/20"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }
      `}
    >

      <Icon size={18} />

      <span>
        {item.label}
      </span>

    </button>
  );
}

function DesktopNavItem({
  item,
  active,
  onClick,
}) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        px-3
        py-2
        text-sm
        font-medium
        transition
        ${
          active
            ? "bg-[#087E8B]/10 text-[#087E8B]"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        }
      `}
    >

      <Icon size={16} />

      <span>
        {item.label}
      </span>

    </button>
  );
}

export default MobileLayout;