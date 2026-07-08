import { Search, SlidersHorizontal } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex items-center rounded-2xl bg-white shadow-md px-4 py-4">

      <Search
        size={20}
        className="text-gray-400"
      />

      <input
        type="text"
        placeholder="Search products..."
        className="ml-3 flex-1 outline-none"
      />

      <button>

        <SlidersHorizontal
          size={20}
          className="text-[#0A2342]"
        />

      </button>

    </div>
  );
}

export default SearchBar;