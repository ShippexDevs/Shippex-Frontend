import { ArrowRight, ShieldCheck } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

function OrderSummaryCard({ onSubmit }) {
  const { cartItems, subtotal } = useCart();

  return (
    <section
      className="
        rounded-xl
        border
        border-[#E3EAF2]
        bg-white
        p-4
        sm:p-5
      "
    >
      <div className="flex items-center gap-2">
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-[#EAF2FF]
            text-[#1769D1]
          "
        >
          <ShieldCheck size={16} />
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#102A43]">
            Order Summary
          </h2>

          <p className="text-[10px] text-slate-400">
            {cartItems.length} items
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2"
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-50
              "
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain p-1"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[10px] font-medium leading-4 text-[#102A43]">
                {item.name}
              </p>

              <p className="text-[9px] text-slate-400">
                {item.quantity}pc
              </p>
            </div>

            <span className="shrink-0 text-[10px] font-semibold text-[#102A43]">
              {formatPrice(
                item.price * item.quantity,
                item.currency || "USD"
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-[#E8EDF3]" />

      <div className="space-y-2 text-[11px]">
        <div className="flex justify-between">
          <span className="text-slate-500">
            Items Total
          </span>

          <span className="font-semibold text-[#102A43]">
            {formatPrice(subtotal, "USD")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Delivery
          </span>

          <span className="font-semibold text-emerald-600">
            FREE
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-[#E8EDF3]" />

      <div className="flex items-end justify-between">
        <span className="text-base font-bold text-[#102A43]">
          Total
        </span>

        <span className="text-xl font-bold text-[#0A2E63]">
          {formatPrice(subtotal, "USD")}
        </span>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#082D5B]
          px-3
          py-3
          text-xs
          font-semibold
          text-white
          transition
          hover:bg-[#0B3C76]
          active:scale-[0.98]
        "
      >
        Submit Supply Request
        <ArrowRight size={14} />
      </button>

      <div className="mt-3 flex items-center justify-center gap-1 text-[9px] text-slate-400">
        <ShieldCheck size={11} />
        Secure & reliable
      </div>
    </section>
  );
}

export default OrderSummaryCard;