import { ArrowRight } from "lucide-react";

function OfferBanner() {
  return (
    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-orange-500
      to-orange-400
      p-6
      text-white
      shadow-xl
      "
    >
      <p className="text-sm">
        THIS WEEK ONLY
      </p>

      <h2 className="text-2xl font-bold mt-2">
        Flat 20% OFF
      </h2>

      <p className="mt-2">
        Selected beverages & snacks
      </p>

      <button
        className="
        mt-5
        bg-white
        text-orange-500
        rounded-full
        px-5
        py-3
        font-semibold
        flex
        items-center
        gap-2
        "
      >
        Shop Now

        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default OfferBanner;