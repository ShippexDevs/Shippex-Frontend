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
    <div className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      border-t
      border-slate-200
      bg-white/95
      backdrop-blur-xl
      lg:hidden
    ">

      <div className="
        mx-auto
        flex
        max-w-6xl
        items-center
        justify-between
        gap-4
        px-4
        py-3
        pb-[calc(0.75rem+env(safe-area-inset-bottom))]
        sm:px-6
      ">

        <div className="shrink-0">

          <p className="text-[10px] font-medium text-slate-400">
            Total
          </p>

          <p className="
            text-lg
            font-bold
            leading-6
            text-[#102A43]
          ">
            {formatPrice(total, currency)}
          </p>

        </div>

        <button
          type="button"
          onClick={onClick}
          disabled={disabled || loading}
          className="
            flex
            min-h-11
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#102A43]
            px-4
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#163C5F]
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:max-w-xs
          "
        >
          {loading
            ? "Please wait..."
            : buttonText}

          {!loading && Icon && (
            <Icon size={17} />
          )}
        </button>

      </div>

    </div>
  );
}

export default StickyActionBar;