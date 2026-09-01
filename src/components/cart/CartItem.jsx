import { Trash2 } from "lucide-react";

import QuantitySelector from "../product/QuantitySelector";
import { formatPrice } from "../../utils/formatPrice";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const currency = item.currency || "USD";

  const price = Number(item.price || 0);

  const totalPrice =
    price * item.quantity;

  const hasDiscount =
    item.originalPrice &&
    Number(item.originalPrice) > price;

  return (
    <article
      className="
        group
        grid
        grid-cols-[64px_minmax(0,1fr)_auto]
        gap-3
        border-b
        border-slate-100
        py-4
        last:border-b-0
        sm:grid-cols-[76px_minmax(0,1fr)_auto]
        sm:gap-4
      "
    >
      {/* Image */}

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          bg-[#F4F7FA]
          sm:h-[76px]
          sm:w-[76px]
        "
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="
              h-full
              w-full
              object-contain
              p-2
            "
          />
        ) : (
          <span className="text-[10px] text-slate-400">
            No image
          </span>
        )}
      </div>

      {/* Product information */}

      <div className="min-w-0">

        {item.brand && (
          <p
            className="
              mb-0.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-slate-400
            "
          >
            {item.brand}
          </p>
        )}

        <h3
          className="
            line-clamp-2
            text-sm
            font-semibold
            leading-5
            text-[#102A43]
          "
        >
          {item.name}
        </h3>

        <div
          className="
            mt-1
            flex
            flex-wrap
            items-center
            gap-1.5
            text-[11px]
          "
        >
          {item.unit && (
            <span className="text-slate-500">
              {item.unit}
            </span>
          )}

          {item.stock !== undefined && (
            <>
              <span className="text-slate-300">
                •
              </span>

              <span
                className={
                  item.stock > 0
                    ? "font-medium text-emerald-600"
                    : "font-medium text-red-500"
                }
              >
                {item.stock > 0
                  ? "In stock"
                  : "Out of stock"}
              </span>
            </>
          )}
        </div>

        {/* Mobile quantity */}

        <div className="mt-3 sm:hidden">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>

      {/* Price / actions */}

      <div
        className="
          flex
          min-w-[72px]
          flex-col
          items-end
          justify-between
          gap-3
        "
      >
        <div className="text-right">

          <p
            className="
              text-sm
              font-bold
              text-[#0A2342]
            "
          >
            {formatPrice(
              totalPrice,
              currency
            )}
          </p>

          {hasDiscount && (
            <p
              className="
                text-[10px]
                text-slate-400
                line-through
              "
            >
              {formatPrice(
                Number(item.originalPrice) *
                  item.quantity,
                currency
              )}
            </p>
          )}
        </div>

        <div className="hidden sm:block">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="
            absolute
            hidden
          "
        >
          <Trash2 />
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-md
            text-slate-300
            transition
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  );
}

export default CartItem;