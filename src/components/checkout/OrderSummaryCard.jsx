import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

function OrderSummaryCard() {
  const {
    cartItems,
    subtotal,
  } = useCart();

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2
            className="
              text-base
              font-bold
              text-[#102A43]
            "
          >
            Order Summary
          </h2>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-500
            "
          >
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "item"
              : "items"}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-slate-100
            px-2.5
            py-1
            text-xs
            font-medium
            text-slate-600
          "
        >
          COD
        </span>

      </div>

      {/* Products */}

      <div className="mt-5 space-y-4">

        {cartItems.map((item) => (

          <div
            key={item.id}
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >

            <div className="min-w-0">

              <p
                className="
                  line-clamp-2
                  text-sm
                  font-medium
                  text-slate-800
                "
              >
                {item.name}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                {item.quantity} ×{" "}
                {formatPrice(
                  item.price,
                  item.currency || "USD"
                )}
              </p>

            </div>

            <span
              className="
                shrink-0
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {formatPrice(
                item.price * item.quantity,
                item.currency || "USD"
              )}
            </span>

          </div>

        ))}

      </div>

      {/* Totals */}

      <div
        className="
          mt-5
          border-t
          border-slate-100
          pt-4
        "
      >

        <div
          className="
            flex
            justify-between
            text-sm
          "
        >
          <span className="text-slate-500">
            Items total
          </span>

          <span className="font-medium">
            {formatPrice(
              subtotal,
              "USD"
            )}
          </span>
        </div>

        <div
          className="
            mt-2
            flex
            justify-between
            text-sm
          "
        >
          <span className="text-slate-500">
            Delivery
          </span>

          <span
            className="
              font-medium
              text-emerald-600
            "
          >
            FREE
          </span>
        </div>

      </div>

      {/* Grand total */}

      <div
        className="
          mt-4
          flex
          items-end
          justify-between
          border-t
          border-slate-100
          pt-4
        "
      >

        <span
          className="
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Total
        </span>

        <span
          className="
            text-xl
            font-bold
            tracking-tight
            text-[#0A2342]
          "
        >
          {formatPrice(
            subtotal,
            "USD"
          )}
        </span>

      </div>

      {/* Payment */}

      <div
        className="
          mt-4
          rounded-xl
          bg-slate-50
          px-3
          py-2.5
        "
      >

        <p
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          Payment method
        </p>

        <p
          className="
            mt-0.5
            text-sm
            font-medium
            text-slate-700
          "
        >
          Cash on Delivery
        </p>

      </div>

    </section>
  );
}

export default OrderSummaryCard;