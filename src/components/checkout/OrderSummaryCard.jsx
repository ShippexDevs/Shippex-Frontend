import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

function OrderSummaryCard() {
  const { cartItems, subtotal } = useCart();

  return (
    <section
      className="
        mt-6
        rounded-3xl
        bg-white
        p-6
        shadow-md
      "
    >
      <h2 className="text-xl font-bold text-[#0A2342]">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-slate-500">
                {item.quantity} × {formatPrice(item.price, item.currency)}
              </p>
            </div>

            <p className="font-semibold">
              {formatPrice(
                item.price * item.quantity,
                item.currency
              )}
            </p>
          </div>
        ))}

      </div>

      <hr className="my-6" />

      <div className="space-y-3">

        <div className="flex justify-between">

          <span>Items Total</span>

          <span className="font-semibold">
            {formatPrice(subtotal, "USD")}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Delivery</span>

          <span className="text-green-600 font-semibold">
            FREE
          </span>

        </div>

      </div>

      <hr className="my-6" />

      <div className="flex justify-between">

        <span className="text-lg font-bold">
          Grand Total
        </span>

        <span className="text-2xl font-bold text-[#0A2342]">
          {formatPrice(subtotal, "USD")}
        </span>

      </div>

    </section>
  );
}

export default OrderSummaryCard;