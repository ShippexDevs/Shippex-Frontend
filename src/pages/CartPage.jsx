import { ArrowLeft, PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const currency =
    cartItems[0]?.currency || "USD";

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F8FC]">

        <div
          className="
            mx-auto
            max-w-6xl
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition
              hover:bg-slate-50
            "
          >
            <ArrowLeft size={17} />
          </button>

          <div className="mt-7">
            <EmptyCart />
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#F5F8FC]
      "
    >

      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-6
          sm:px-6
          lg:px-8
        "
      >

        {/* Header */}

        <header
          className="
            mb-6
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div className="flex items-start gap-3">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                mt-0.5
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <div className="flex items-center gap-2">

                <h1
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#102A43]
                    sm:text-2xl
                  "
                >
                  My Cart
                </h1>

                <span
                  className="
                    rounded-md
                    bg-[#EAF2F7]
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    text-[#315B75]
                  "
                >
                  {totalItems}
                </span>

              </div>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                Review your supplies before submitting the request.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={clearCart}
            className="
              shrink-0
              text-xs
              font-medium
              text-red-500
              transition
              hover:text-red-600
            "
          >
            Clear cart
          </button>

        </header>

        {/* Main */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:items-start
          "
        >

          {/* Products */}

          <section
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              sm:px-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                py-4
              "
            >
              <div className="flex items-center gap-2">

                <PackageCheck
                  size={17}
                  className="text-[#0F6E8C]"
                />

                <h2
                  className="
                    text-sm
                    font-bold
                    text-[#102A43]
                  "
                >
                  Requested Supplies
                </h2>

              </div>

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                {cartItems.length} products
              </span>
            </div>

            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                  onDecrease={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                  onRemove={() =>
                    removeFromCart(item.id)
                  }
                />
              ))}
            </div>

            {/* Information strip */}

            <div
              className="
                mb-4
                mt-1
                flex
                items-center
                gap-2
                rounded-lg
                bg-[#F2F7FB]
                px-3
                py-2.5
                text-[10px]
                text-slate-500
              "
            >
              <PackageCheck
                size={13}
                className="shrink-0 text-[#0F6E8C]"
              />

              Your request will be prepared and delivered to your vessel.
            </div>

          </section>

          {/* Summary */}

          <div className="lg:sticky lg:top-5">

            <CartSummary
              subtotal={subtotal}
              currency={currency}
              itemCount={totalItems}
              onCheckout={() =>
                navigate("/checkout")
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartPage;