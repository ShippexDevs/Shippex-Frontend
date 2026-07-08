function ConfirmationModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
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
        bg-black/50
        px-5
      "
    >
      <div
        className="
          w-full
          max-w-sm
          rounded-3xl
          bg-white
          p-6
          shadow-xl
        "
      >
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-3 text-slate-600">
          {message}
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onCancel}
            className="
              flex-1
              rounded-2xl
              border
              border-slate-300
              py-3
              font-semibold
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
              flex-1
              rounded-2xl
              bg-red-500
              py-3
              font-semibold
              text-white
            "
          >
            {confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmationModal;