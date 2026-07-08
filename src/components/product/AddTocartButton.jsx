import { useRef, useState } from "react";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";



function AddToCartButton({ product }) {
  const {
    cartItems,
    addToCart,
    updateQuantity,
  } = useCart();

  const [showToast, setShowToast] = useState(false);

  const toastTimer = useRef(null);

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;

  function handleAddToCart() {
    addToCart(product, 1);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setShowToast(true);

    toastTimer.current = setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }

  return (
    <>
     
      <div className="flex items-center justify-between">

        {/* Price */}

        <div>

          <p className="text-sm text-slate-500">
            Price
          </p>

          <h2 className="text-2xl font-bold text-[#0A2342]">
            {formatPrice(product.price, product.currency)}
          </h2>

        </div>

        {/* Cart Action */}

        {!cartItem ? (

          <button
            onClick={handleAddToCart}
            className="
              rounded-2xl
              bg-[#0A2342]
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#123B68]
              active:scale-95
            "
          >
            Add To Cart
          </button>

        ) : (

          <div
            className="
              flex
              items-center
              gap-5
              rounded-2xl
              bg-[#0A2342]
              px-5
              py-3
              text-white
            "
          >

            <button
              onClick={() =>
                updateQuantity(
                  product.id,
                  quantity - 1
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white
                text-xl
                font-bold
                text-[#0A2342]
                transition
                active:scale-95
              "
            >
              −
            </button>

            <span className="text-lg font-bold">
              {quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(
                  product.id,
                  quantity + 1
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white
                text-xl
                font-bold
                text-[#0A2342]
                transition
                active:scale-95
              "
            >
              +
            </button>

          </div>

        )}

      </div>
    </>
  );
}

export default AddToCartButton;