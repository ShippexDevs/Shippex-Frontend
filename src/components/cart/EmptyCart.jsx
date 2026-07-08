import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24">

      <div className="rounded-full bg-cyan-100 p-6">
        <ShoppingCart
          size={40}
          className="text-[#0F6E8C]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        Your cart is empty
      </h2>

      <p className="mt-3 text-center text-slate-500">
        Add products to start your order.
      </p>

      <button
        onClick={() => navigate("/")}
        className="
          mt-8
          rounded-2xl
          bg-[#0A2342]
          px-8
          py-4
          font-semibold
          text-white
        "
      >
        Continue Shopping
      </button>

    </div>
  );
}

export default EmptyCart;