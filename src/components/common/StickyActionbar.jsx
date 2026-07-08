import { formatPrice } from "../../utils/formatPrice";

function StickyActionBar({
  total,
  currency = "USD",
  buttonText,
  buttonIcon: Icon,
  onClick,
  loading = false,
  disabled = false,
}) {
  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-slate-200
        bg-white/95
        backdrop-blur-xl
        shadow-[0_-8px_25px_rgba(0,0,0,0.08)]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-5xl
          items-center
          justify-between
          gap-4
          px-5
          py-4
        "
      >
        {/* Total */}

        <div className="flex-shrink-0">
          <p className="text-sm text-slate-500">
            Total
          </p>

          <h2 className="text-2xl font-bold text-[#0A2342]">
            {formatPrice(total, currency)}
          </h2>
        </div>

        {/* Action Button */}

        <button
          type="button"
          onClick={onClick}
          disabled={disabled || loading}
          className={`
            flex
            min-w-[190px]
            items-center
            justify-center
            gap-2
            rounded-2xl
            px-6
            py-4
            font-semibold
            text-white
            transition-all
            duration-200
            ${
              disabled || loading
                ? "cursor-not-allowed bg-slate-400"
                : "bg-[#0A2342] hover:bg-[#123B68] active:scale-95"
            }
          `}
        >
          {!loading && Icon && <Icon size={20} />}

          {loading ? "Please wait..." : buttonText}
        </button>
      </div>
    </div>
  );
}

export default StickyActionBar;