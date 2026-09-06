import {
  UserCircle,
  Mail,
  Phone,
  BriefcaseBusiness,
  Ship,
  Hash,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../layouts/MobileLayout";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmModal from "../components/common/LogoutConfirmModal";

function ProfilePage() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogoutClick = () => {
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
    <MobileLayout>

      <div className="mx-auto max-w-4xl px-4 py-6 pb-24 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-7">

          <p className="text-sm font-medium text-[#087E8B]">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102A43] sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            View your registered account and ship details.
          </p>

        </div>

        {/* Profile header */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

          <div className="bg-[#14283D] px-6 py-7 text-white">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold">
                {user.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  {user.name || "-"}
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  @{user.username || "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

            <ProfileField
              icon={Mail}
              label="Email"
              value={user.email}
            />

            <ProfileField
              icon={Phone}
              label="WhatsApp"
              value={user.whatsappContactNo}
            />

            <ProfileField
              icon={BriefcaseBusiness}
              label="Designation"
              value={user.designation}
            />

            <ProfileField
              icon={Ship}
              label="Ship Name"
              value={user.shipName}
            />

            <ProfileField
              icon={Hash}
              label="IMO Number"
              value={user.shipIMONumber}
            />

            <ProfileField
              icon={ShieldCheck}
              label="Account Status"
              value={
                user.verified
                  ? "Verified"
                  : "Not Verified"
              }
              verified={user.verified}
            />

          </div>

        </section>

        {/* Logout */}

        <button
          type="button"
          onClick={handleLogoutClick}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-white
            px-4
            py-3
            text-sm
            font-semibold
            text-red-600
            transition
            hover:bg-red-50
          "
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

      {/* Logout confirmation modal */}

      <LogoutConfirmModal
        open={logoutModalOpen}
        onCancel={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

    </MobileLayout>
  );
}

function ProfileField({
  icon: Icon,
  label,
  value,
  verified = false,
}) {
  return (
    <div className="flex items-start gap-3 p-5">

      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${
            verified
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}

export default ProfilePage;