import { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import ConfirmationModal from "../common/ConfirmationModal";

function Header() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { clearCart } = useCart();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const firstName =
    user?.name?.split(" ")[0] ?? "Captain";

  function confirmLogout() {

    clearCart();

    logout();

    toast.success("Logged out successfully.");

    setShowLogoutModal(false);

    navigate("/", {
      replace: true,
    });

  }

  return (
    <>

      <header
        className="
          rounded-b-[32px]
          bg-[#071B35]
          px-5
          pb-8
          pt-12
          text-white
        "
      >

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-cyan-300">
              Welcome Back
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              {firstName} 👋
            </h1>

          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="
                relative
                rounded-2xl
                bg-white/10
                p-3
              "
            >
              <Bell size={22} />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-2
                  w-2
                  rounded-full
                  bg-orange-500
                "
              />

            </button>

            {user && (

              <button
                type="button"
                onClick={() =>
                  setShowLogoutModal(true)
                }
                className="
                  rounded-2xl
                  bg-red-500
                  p-3
                  transition
                  hover:bg-red-600
                "
              >
                <LogOut size={20} />
              </button>

            )}

          </div>

        </div>

      </header>

      <ConfirmationModal
        open={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from Shippex?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={() =>
          setShowLogoutModal(false)
        }
      />

    </>
  );
}

export default Header;