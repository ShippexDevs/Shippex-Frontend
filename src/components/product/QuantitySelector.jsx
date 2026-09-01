import { Minus, Plus } from "lucide-react";

function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div
      className="
        inline-flex
        h-8
        items-center
        rounded-lg
        border
        border-slate-200
        bg-white
      "
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDecrease();
        }}
        disabled={quantity <= 1}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-l-lg
          text-slate-500
          transition
          hover:bg-slate-50
          hover:text-slate-900
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        <Minus size={13} />
      </button>

      <span
        className="
          flex
          h-8
          min-w-8
          items-center
          justify-center
          border-x
          border-slate-200
          px-1
          text-xs
          font-semibold
          text-slate-800
        "
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onIncrease();
        }}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-r-lg
          text-slate-500
          transition
          hover:bg-slate-50
          hover:text-slate-900
        "
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

export default QuantitySelector;