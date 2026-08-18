import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import QuantitySelector from "../product/QuantitySelector";
import toast from "react-hot-toast";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const {
    addToCart,
    updateQuantity,
    cartItems,
    isProductInCart,
  } = useCart();

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddClick = (event) => {

    event.stopPropagation();

    const alreadyInCart =
      isProductInCart(product.id);

    addToCart(product, 1);

    if (!alreadyInCart) {

      toast.success(
        `${product.name} added to cart`
      );

    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        min-w-[140px]
        cursor-pointer
        rounded-2xl
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      {/* Product Image */}

      <div className="relative flex justify-center">

        <div
          className="
            flex
            h-32
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
          "
        >

          <img
            src={product.image}
            alt={product.name}
            className="
              h-28
              w-28
              object-contain
              transition-transform
              duration-300
              hover:scale-105
            "
          />

        </div>

        {/* Add Button */}

        {quantity === 0 ? (

          <button
            onClick={handleAddClick}
            className="
              absolute
              bottom-1
              right-1
              rounded-lg
              border
              border-pink-500
              bg-white
              px-3
              py-1
              text-xs
              font-bold
              text-pink-500
              transition
              hover:bg-pink-50
              active:scale-95
            "
          >
            ADD
          </button>

        ) : (

          <div className="absolute bottom-1 right-1">

            <QuantitySelector
              quantity={quantity}
              onIncrease={() =>
                updateQuantity(
                  product.id,
                  quantity + 1
                )
              }
              onDecrease={() =>
                updateQuantity(
                  product.id,
                  quantity - 1
                )
              }
            />

          </div>

        )}

      </div>

      {/* Price */}

      <div className="mt-3">

        <div className="flex items-center gap-2">

          <p className="text-base font-bold text-[#0A2342]">
            {formatPrice(
              product.price,
              product.currency
            )}
          </p>

          {product.originalPrice && (
            <p className="text-xs text-slate-400 line-through">
              {formatPrice(
                product.originalPrice,
                product.currency
              )}
            </p>
          )}

        </div>

      </div>

      {/* Product Name */}

      <h3
        className="
          mt-2
          line-clamp-2
          text-sm
          font-semibold
          text-slate-800
        "
      >
        {product.name}
      </h3>

      {/* Brand */}

      {product.brand && (
        <p className="mt-1 text-xs text-slate-500">
          {product.brand}
        </p>
      )}

      {/* Unit */}

      <p className="mt-1 text-xs text-slate-500">
        {product.unit}
      </p>

    </div>
  );
}

export default ProductCard;