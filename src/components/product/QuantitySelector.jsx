function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        bg-white
        shadow-sm
        p-2
        w-40
      "
    >
      <button
        onClick={onDecrease}
        className="
          h-10
          w-10
          rounded-xl
          bg-slate-100
          text-xl
          active:scale-95
        "
      >
        -
      </button>

      <span className="font-semibold text-lg">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="
          h-10
          w-10
          rounded-xl
          bg-[#0A2342]
          text-white
          text-xl
          active:scale-95
        "
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;