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
  const isDisabled =
    disabled || loading;

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
        bg-white
        px-4
        py-3
        shadow-[0_-6px_20px_rgba(15,23,42,0.08)]
        sm:px-6
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-6xl
          items-center
          gap-4
        "
      >

        {/* Total */}

        <div className="min-w-0 flex-1">

          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            Total
          </p>

          <p
            className="
              text-lg
              font-bold
              leading-tight
              text-[#0A2342]
            "
          >
            {formatPrice(
              total,
              currency
            )}
          </p>

        </div>

        {/* Button */}

        <button
          type="button"
          onClick={onClick}
          disabled={isDisabled}
          className="
            flex
            min-h-11
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#0A2342]
            px-5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#123B68]
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:px-6
          "
        >

          {loading
            ? "Submitting..."
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