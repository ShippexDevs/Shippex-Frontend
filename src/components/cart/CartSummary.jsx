import { formatPrice } from "../../utils/formatPrice";

function CartSummary({
  subtotal,
  currency = "USD",
}) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-md
      "
    >
      <div className="flex justify-between">

        <span>Subtotal</span>

        <span className="font-semibold">
          {formatPrice(subtotal, currency)}
        </span>

      </div>

      <div className="mt-4 flex justify-between">

        <span>Delivery</span>

        <span className="text-green-600 font-semibold">
          FREE
        </span>

      </div>

      <hr className="my-5" />

      <div className="flex justify-between">

        <span className="font-bold">
          Total
        </span>

        <span className="text-xl font-bold text-[#0A2342]">
          {formatPrice(subtotal, currency)}
        </span>

      </div>

    </div>
  );
}

export default CartSummary;