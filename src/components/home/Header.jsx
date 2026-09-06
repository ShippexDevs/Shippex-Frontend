import { useState } from "react";
import {
  HelpCircle,
  Info,
  KeyRound,
  LogOut,
  Menu,
  UserCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import LogoutConfirmModal from "../common/LogoutConfirmModal";

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogoutClick = () => {
    setMenuOpen(false);
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur-md
        "
      >
        <div
          className="
            flex
            h-[68px]
            items-center
            justify-between
            px-5
            lg:px-8
          "
        >

          {/* Hamburger */}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-600
              transition
              hover:bg-slate-100
            "
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#087E8B]
                text-white
              "
            >
              <span className="text-sm font-bold">
                S
              </span>
            </div>

            <div className="text-left">

              <p className="text-base font-bold tracking-tight text-[#102A43]">
                Shippex
              </p>

              <p className="hidden text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
                Ship Supplies
              </p>

            </div>
          </button>

          {/* Profile shortcut */}

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-600
              transition
              hover:bg-slate-200
            "
            aria-label="Profile"
          >
            <UserCircle size={21} />
          </button>

        </div>
      </header>

      {/* Overlay */}

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="
            fixed
            inset-0
            z-50
            bg-slate-950/40
            backdrop-blur-[2px]
          "
        />
      )}

      {/* Secondary menu */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-[60]
          flex
          w-[285px]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Menu header */}

        <div
          className="
            flex
            h-[68px]
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
          "
        >

          <div>
            <p className="font-bold text-slate-900">
              Menu
            </p>

            <p className="text-xs text-slate-400">
              Account & support
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="
              rounded-xl
              p-2
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Secondary navigation */}

        <div className="flex-1 px-4 py-5">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Account
          </p>

          <div className="space-y-1">

            <MenuItem
              icon={UserCircle}
              label="My Profile"
              onClick={() => handleNavigate("/profile")}
            />

            <MenuItem
              icon={KeyRound}
              label="Change Password"
              onClick={() =>
                handleNavigate("/change-password")
              }
            />

          </div>

          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Support
          </p>

          <div className="space-y-1">

            <MenuItem
              icon={HelpCircle}
              label="Help & Support"
              onClick={() => {
                setMenuOpen(false);
              }}
            />

            <MenuItem
              icon={Info}
              label="About Shippex"
              onClick={() => {
                setMenuOpen(false);
              }}
            />

          </div>

        </div>

        {/* Logout */}

        <div className="border-t border-slate-200 p-4">

          <button
            type="button"
            onClick={handleLogoutClick}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-semibold
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      <LogoutConfirmModal
        open={logoutModalOpen}
        onCancel={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        text-left
        text-sm
        font-medium
        text-slate-600
        transition
        hover:bg-slate-100
        hover:text-slate-900
      "
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

export default Header;