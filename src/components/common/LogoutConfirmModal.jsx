import { LogOut, X } from "lucide-react";

function LogoutConfirmModal({
  open,
  onCancel,
  onConfirm,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/50
        px-5
        backdrop-blur-sm
      "
      onClick={onCancel}
    >
      <div
        className="
          w-full
          max-w-sm
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-start justify-between">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-600
            "
          >
            <LogOut size={20} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              p-1.5
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-600
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>

        {/* Content */}

        <div className="mt-5">

          <h2 className="text-lg font-bold text-slate-900">
            Logout?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Are you sure you want to logout from your Shippex account?
          </p>

        </div>

        {/* Actions */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-red-700
            "
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default LogoutConfirmModal;