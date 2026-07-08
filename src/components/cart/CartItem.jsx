import { Trash2 } from "lucide-react";

import { formatPrice } from "../../utils/formatPrice";
import QuantitySelector from "../product/QuantitySelector";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-4
        shadow-md
      "
    >
      <div className="flex gap-4">

        <img
          src={item.image}
          alt={item.name}
          className="
            h-24
            w-24
            rounded-2xl
            object-cover
            bg-slate-50
          "
        />

        <div className="flex-1">

          <h3 className="font-bold">
            {item.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {item.unit}
          </p>

          <p className="mt-3 text-lg font-bold text-[#0A2342]">
            {formatPrice(
              item.price,
              item.currency
            )}
          </p>

        </div>

        <button
          onClick={onRemove}
          className="
            self-start
            rounded-xl
            p-2
            text-red-500
            hover:bg-red-50
          "
        >
          <Trash2 size={20} />
        </button>

      </div>

      <div className="mt-5">

        <QuantitySelector
          quantity={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />

      </div>

    </div>
  );
}

export default CartItem;