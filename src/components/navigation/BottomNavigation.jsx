import { NavLink } from "react-router-dom";
import { navigation } from "../../data/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function BottomNavigation() {

  const { totalItems } = useCart();

  const { token } = useAuth();

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-white/95
        backdrop-blur-xl
        border-t
        border-slate-200
        shadow-[0_-8px_25px_rgba(0,0,0,0.08)]
        rounded-t-3xl
      "
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-around h-20">

          {navigation.map((item) => {

            const Icon = item.icon;

            const isCart = item.path === "/cart";

            const requiresAuthentication =
              item.path === "/cart" ||
              item.path === "/orders" ||
              item.path === "/profile" ||
              item.path === "/checkout";

            const destinationPath =
              !token && requiresAuthentication
                ? "/login"
                : item.path;

            return (

              <NavLink
                key={item.path}
                to={destinationPath}
                className={({ isActive }) =>
                  `flex flex-col items-center transition-all duration-200 ${
                    isActive
                      ? "text-[#0F6E8C]"
                      : "text-slate-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>

                    <div
                      className={`
                        relative
                        transition-all
                        duration-200
                        p-2
                        rounded-xl
                        ${
                          isActive
                            ? "bg-cyan-100 scale-110"
                            : ""
                        }
                      `}
                    >

                      <Icon size={22} />

                      {isCart && totalItems > 0 && (

                        <span
                          className="
                            absolute
                            -top-1
                            -right-1
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-[#FF6B35]
                            text-[10px]
                            font-bold
                            text-white
                          "
                        >
                          {totalItems}
                        </span>

                      )}

                    </div>

                    <span className="mt-1 text-[11px] font-medium">
                      {item.title}
                    </span>

                  </>
                )}

              </NavLink>

            );

          })}

        </div>
      </div>
    </nav>
  );
}

export default BottomNavigation;