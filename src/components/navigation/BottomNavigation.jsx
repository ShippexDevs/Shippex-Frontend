import {
  Home,
  Grid2X2,
  ShoppingCart,
  ClipboardList,
  UserCircle,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Categories",
    icon: Grid2X2,
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

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-slate-200
        bg-white/95
        px-2
        pb-[env(safe-area-inset-bottom)]
        shadow-[0_-4px_20px_rgba(15,23,42,0.06)]
        backdrop-blur-md
        lg:hidden
      "
    >
      <div className="mx-auto flex max-w-xl items-center justify-around">

        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`
                flex
                min-w-[62px]
                flex-col
                items-center
                gap-1
                px-2
                py-2.5
                text-[10px]
                font-semibold
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
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition
                  ${
                    active
                      ? "bg-[#E7F6F7]"
                      : "bg-transparent"
                  }
                `}
              >
                <Icon size={19} />
              </div>

              <span>
                {item.label}
              </span>

            </button>
          );
        })}

      </div>
    </nav>
  );
}

export default BottomNavigation;