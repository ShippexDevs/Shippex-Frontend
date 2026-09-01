import { ShieldCheck } from "lucide-react";

import { formatPrice } from "../../utils/formatPrice";

function CartSummary({
  subtotal,
  currency = "USD",
  itemCount = 0,
  onCheckout,
}) {
  return (
    <aside
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <div className="flex items-center justify-between">
        <h2
          className="
            text-sm
            font-bold
            text-[#102A43]
          "
        >
          Request Summary
        </h2>

        <span
          className="
            text-[11px]
            text-slate-400
          "
        >
          {itemCount} items
        </span>
      </div>

      <div className="mt-6 space-y-3">

        <div
          className="
            flex
            items-center
            justify-between
            text-xs
          "
        >
          <span className="text-slate-500">
            Items total
          </span>

          <span className="font-medium text-slate-800">
            {formatPrice(
              subtotal,
              currency
            )}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            text-xs
          "
        >
          <span className="text-slate-500">
            Delivery
          </span>

          <span className="font-semibold text-emerald-600">
            FREE
          </span>
        </div>
      </div>

      <div
        className="
          my-5
          border-t
          border-dashed
          border-slate-200
        "
      />

      <div className="flex items-end justify-between">

        <div>
          <p className="text-[11px] text-slate-400">
            Total
          </p>

          <p
            className="
              mt-0.5
              text-xl
              font-bold
              tracking-tight
              text-[#0A2342]
            "
          >
            {formatPrice(
              subtotal,
              currency
            )}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="
          mt-5
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#0A2342]
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#123B63]
          active:scale-[0.99]
        "
      >
        Submit Request

        <span className="text-base">
          →
        </span>
      </button>

      <div
        className="
          mt-4
          flex
          items-center
          justify-center
          gap-1.5
          text-[10px]
          text-slate-400
        "
      >
        <ShieldCheck size={12} />

        Prices shown in {currency}
      </div>
    </aside>
  );
}

export default CartSummary;