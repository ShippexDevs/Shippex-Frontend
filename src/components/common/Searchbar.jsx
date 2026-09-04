import { Search, X } from "lucide-react";

function SearchBar({ value = "", onChange }) {
  return (
    <div className="relative mt-6">

      <Search
        size={19}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        placeholder="Search products..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          py-3.5
          pl-11
          pr-11
          text-sm
          text-slate-800
          shadow-sm
          outline-none
          transition

          placeholder:text-slate-400

          focus:border-[#0F6E8C]
          focus:ring-2
          focus:ring-[#0F6E8C]/10
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange?.("")}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <X size={17} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;